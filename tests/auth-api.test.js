import assert from 'node:assert/strict';
import { after, before, beforeEach, describe, test } from 'node:test';
import { hashPassword } from '../server/auth/password.js';
import { createApp } from '../server/app.js';
import { createMemoryUserStore } from '../server/users/userStore.js';

describe('user management API', () => {
  let server;
  let baseUrl;
  let userStore;

  before(async () => {
    userStore = createMemoryUserStore();
    const app = createApp({ userStore, jwtSecret: 'test-secret' });

    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', resolve);
    });

    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  beforeEach(() => {
    userStore.clear();
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  test('registers a user, logs in, and returns the authenticated profile', async () => {
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Nelson Ponte',
        email: 'nelson@example.com',
        password: 'password123',
      }),
    });

    assert.equal(registerResponse.status, 201);
    const registered = await registerResponse.json();
    assert.equal(registered.user.email, 'nelson@example.com');
    assert.equal(registered.user.role, 'user');
    assert.equal(registered.user.passwordHash, undefined);
    assert.ok(registered.token);

    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nelson@example.com',
        password: 'password123',
      }),
    });

    assert.equal(loginResponse.status, 200);
    const loggedIn = await loginResponse.json();
    assert.ok(loggedIn.token);

    const profileResponse = await fetch(`${baseUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${loggedIn.token}` },
    });

    assert.equal(profileResponse.status, 200);
    const profile = await profileResponse.json();
    assert.equal(profile.user.name, 'Nelson Ponte');
    assert.equal(profile.user.email, 'nelson@example.com');
  });

  test('rejects duplicate emails and invalid credentials', async () => {
    const payload = {
      name: 'David Cardoso',
      email: 'david@example.com',
      password: 'password123',
    };

    const firstResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    assert.equal(firstResponse.status, 201);

    const duplicateResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    assert.equal(duplicateResponse.status, 409);

    const invalidLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'david@example.com',
        password: 'wrong-password',
      }),
    });
    assert.equal(invalidLoginResponse.status, 401);
  });

  test('updates the authenticated profile and protects admin routes by role', async () => {
    const userResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Adriano Arruda',
        email: 'adriano@example.com',
        password: 'password123',
      }),
    });
    const userBody = await userResponse.json();

    const updateResponse = await fetch(`${baseUrl}/api/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userBody.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Adriano Furtado Arruda',
        email: 'adriano.arruda@example.com',
      }),
    });

    assert.equal(updateResponse.status, 200);
    const updated = await updateResponse.json();
    assert.equal(updated.user.name, 'Adriano Furtado Arruda');
    assert.equal(updated.user.email, 'adriano.arruda@example.com');

    const forbiddenResponse = await fetch(`${baseUrl}/api/admin/users`, {
      headers: { Authorization: `Bearer ${userBody.token}` },
    });
    assert.equal(forbiddenResponse.status, 403);

    userStore.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: await hashPassword('password123'),
      role: 'admin',
    });

    const adminLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'password123',
      }),
    });

    assert.equal(adminLoginResponse.status, 200);
    const adminBody = await adminLoginResponse.json();

    const adminUsersResponse = await fetch(`${baseUrl}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminBody.token}` },
    });

    assert.equal(adminUsersResponse.status, 200);
    const adminUsers = await adminUsersResponse.json();
    assert.equal(adminUsers.users.length, 2);
  });
});
