import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function toCamelCaseUser(row) {
  if (!row) return null;

  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toPublicUser(user) {
  if (!user) return null;

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function createSqliteUserStore(filePath) {
  const resolvedPath = path.resolve(filePath);
  const directory = path.dirname(resolvedPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const db = new Database(resolvedPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return {
    create(user) {
      const now = new Date().toISOString();

      try {
        const result = db.prepare(`
          INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
          VALUES (@name, @email, @passwordHash, @role, @createdAt, @updatedAt)
        `).run({
          name: user.name.trim(),
          email: normalizeEmail(user.email),
          passwordHash: user.passwordHash,
          role: user.role || 'user',
          createdAt: now,
          updatedAt: now,
        });

        return this.findById(result.lastInsertRowid);
      } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          throw new Error('EMAIL_ALREADY_EXISTS');
        }

        throw error;
      }
    },

    findByEmail(email) {
      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizeEmail(email));
      return toCamelCaseUser(row);
    },

    findById(id) {
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
      return toCamelCaseUser(row);
    },

    update(id, changes) {
      const existing = this.findById(id);

      if (!existing) {
        return null;
      }

      const nextUser = {
        id,
        name: changes.name?.trim() || existing.name,
        email: changes.email ? normalizeEmail(changes.email) : existing.email,
        updatedAt: new Date().toISOString(),
      };

      try {
        db.prepare(`
          UPDATE users
          SET name = @name, email = @email, updated_at = @updatedAt
          WHERE id = @id
        `).run(nextUser);
      } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          throw new Error('EMAIL_ALREADY_EXISTS');
        }

        throw error;
      }

      return this.findById(id);
    },

    list() {
      return db.prepare('SELECT * FROM users ORDER BY created_at ASC').all().map(toCamelCaseUser);
    },

    clear() {
      db.prepare('DELETE FROM users').run();
    },

    toPublicUser,
  };
}
