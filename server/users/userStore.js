import fs from 'node:fs';
import path from 'node:path';

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function createUserRecord(user, id) {
  const now = new Date().toISOString();

  return {
    id,
    name: user.name.trim(),
    email: normalizeEmail(user.email),
    passwordHash: user.passwordHash,
    role: user.role || 'user',
    createdAt: now,
    updatedAt: now,
  };
}

function publicUser(user) {
  if (!user) return null;

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function createMemoryUserStore(initialUsers = []) {
  let users = [];
  let nextId = 1;

  const store = {
    create(user) {
      const existing = store.findByEmail(user.email);

      if (existing) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }

      const record = createUserRecord(user, String(nextId));
      nextId += 1;
      users.push(record);
      return record;
    },

    findByEmail(email) {
      const normalized = normalizeEmail(email);
      return users.find((user) => user.email === normalized) || null;
    },

    findById(id) {
      return users.find((user) => user.id === String(id)) || null;
    },

    update(id, changes) {
      const user = store.findById(id);

      if (!user) {
        return null;
      }

      const nextEmail = changes.email ? normalizeEmail(changes.email) : user.email;
      const duplicate = users.find((candidate) => candidate.email === nextEmail && candidate.id !== user.id);

      if (duplicate) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }

      user.name = changes.name?.trim() || user.name;
      user.email = nextEmail;
      user.updatedAt = new Date().toISOString();

      return user;
    },

    list() {
      return [...users];
    },

    clear() {
      users = [];
      nextId = 1;
    },

    toPublicUser: publicUser,
  };

  initialUsers.forEach((user) => store.create(user));
  return store;
}

export function createFileUserStore(filePath) {
  const resolvedPath = path.resolve(filePath);
  const directory = path.dirname(resolvedPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  function readUsers() {
    if (!fs.existsSync(resolvedPath)) {
      return [];
    }

    const content = fs.readFileSync(resolvedPath, 'utf8');
    return content ? JSON.parse(content) : [];
  }

  function writeUsers(users) {
    fs.writeFileSync(resolvedPath, JSON.stringify(users, null, 2));
  }

  const store = createMemoryUserStore(readUsers());
  const persist = (method) => (...args) => {
    const result = method(...args);
    writeUsers(store.list());
    return result;
  };

  return {
    ...store,
    create: persist(store.create),
    update: persist(store.update),
    clear: persist(store.clear),
  };
}
