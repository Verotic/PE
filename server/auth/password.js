import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);

  return `scrypt:${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password, passwordHash) {
  const [algorithm, salt, key] = passwordHash.split(':');

  if (algorithm !== 'scrypt' || !salt || !key) {
    return false;
  }

  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  const storedKey = Buffer.from(key, 'hex');

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
}
