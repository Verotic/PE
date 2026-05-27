import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashPassword, verifyPassword } from './auth/password.js';
import { createToken, verifyToken } from './auth/token.js';
import { createSqliteUserStore } from './users/sqliteUserStore.js';
import {
  hasErrors,
  validateLoginInput,
  validateProfileInput,
  validateRegisterInput,
} from './users/validation.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'dist');

function getBearerToken(req) {
  const header = req.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  return header.slice('Bearer '.length);
}

function createAuthMiddleware(userStore, jwtSecret) {
  return (req, res, next) => {
    const token = getBearerToken(req);
    const payload = verifyToken(token, jwtSecret);

    if (!payload?.sub) {
      return res.status(401).json({ error: 'Autenticacao obrigatoria.' });
    }

    const user = userStore.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: 'Utilizador nao encontrado.' });
    }

    req.user = user;
    return next();
  };
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Permissao insuficiente.' });
    }

    return next();
  };
}

function userResponse(userStore, user, jwtSecret) {
  return {
    user: userStore.toPublicUser(user),
    token: createToken({ sub: user.id, role: user.role }, jwtSecret),
  };
}

export function createApp(options = {}) {
  const app = express();
  const jwtSecret = options.jwtSecret || process.env.JWT_SECRET || 'development-secret-change-me';
  const userStore = options.userStore || createSqliteUserStore(process.env.SQLITE_DB_PATH || path.join(projectRoot, 'data', 'caca.sqlite'));
  const requireAuth = createAuthMiddleware(userStore, jwtSecret);

  app.use(cors());
  app.use(express.json());

  app.post('/api/auth/register', async (req, res) => {
    const errors = validateRegisterInput(req.body);

    if (hasErrors(errors)) {
      return res.status(400).json({ error: 'Dados de registo invalidos.', errors });
    }

    try {
      const user = userStore.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash: await hashPassword(req.body.password),
        role: 'user',
      });

      return res.status(201).json(userResponse(userStore, user, jwtSecret));
    } catch (error) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        return res.status(409).json({ error: 'Este email ja esta registado.' });
      }

      return res.status(500).json({ error: 'Nao foi possivel criar o utilizador.' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const errors = validateLoginInput(req.body);

    if (hasErrors(errors)) {
      return res.status(400).json({ error: 'Dados de login invalidos.', errors });
    }

    const user = userStore.findByEmail(req.body.email);

    if (!user || !(await verifyPassword(req.body.password, user.passwordHash))) {
      return res.status(401).json({ error: 'Email ou password invalidos.' });
    }

    return res.json(userResponse(userStore, user, jwtSecret));
  });

  app.get('/api/users/me', requireAuth, (req, res) => {
    return res.json({ user: userStore.toPublicUser(req.user) });
  });

  app.put('/api/users/me', requireAuth, (req, res) => {
    const errors = validateProfileInput(req.body);

    if (hasErrors(errors)) {
      return res.status(400).json({ error: 'Dados de perfil invalidos.', errors });
    }

    try {
      const user = userStore.update(req.user.id, {
        name: req.body.name,
        email: req.body.email,
      });

      return res.json({ user: userStore.toPublicUser(user) });
    } catch (error) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        return res.status(409).json({ error: 'Este email ja esta registado.' });
      }

      return res.status(500).json({ error: 'Nao foi possivel atualizar o perfil.' });
    }
  });

  app.get('/api/admin/users', requireAuth, requireRole('admin'), (req, res) => {
    return res.json({ users: userStore.list().map(userStore.toPublicUser) });
  });

  app.get('/api/weather/forecast', async (req, res) => {
    try {
      const { lat, lon, units, lang } = req.query;
      const apiKey = process.env.WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
      const response = await fetch(url);
      const data = await response.json();

      return res.status(response.status).json(data);
    } catch (error) {
      console.error('Erro no proxy da API Weather:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/news', async (req, res) => {
    try {
      const apiKey = process.env.NEWS_API_KEY;
      const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=pt&language=pt&category=health&timezone=atlantic/azores&image=1&removeduplicate=1`;
      const response = await fetch(url);
      const data = await response.json();

      return res.status(response.status).json(data);
    } catch (error) {
      console.error('Erro no proxy da API News:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  app.use(express.static(distRoot));
  app.use(express.static(projectRoot));

  return app;
}
