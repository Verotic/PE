import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, test } from 'node:test';
import { createSqliteUserStore } from '../server/users/sqliteUserStore.js';

const tempDir = mkdtempSync(path.join(tmpdir(), 'caca-sqlite-test-'));

after(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('SQLite user store', () => {
  test('persists users between store instances', () => {
    const dbPath = path.join(tempDir, 'users.sqlite');
    const firstStore = createSqliteUserStore(dbPath);

    firstStore.create({
      name: 'Adriano Arruda',
      email: 'adriano@example.com',
      passwordHash: 'hash-value',
      role: 'admin',
    });

    const secondStore = createSqliteUserStore(dbPath);
    const user = secondStore.findByEmail('adriano@example.com');

    assert.equal(user.name, 'Adriano Arruda');
    assert.equal(user.email, 'adriano@example.com');
    assert.equal(user.role, 'admin');
    assert.equal(user.passwordHash, 'hash-value');
  });
});
