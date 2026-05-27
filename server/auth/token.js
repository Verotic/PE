import { createHmac } from 'node:crypto';

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function base64UrlDecode(value) {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
}

function sign(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createToken(payload, secret) {
  const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
  const body = base64UrlEncode({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
  });
  const signature = sign(`${header}.${body}`, secret);

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token, secret) {
  const parts = token?.split('.');

  if (!parts || parts.length !== 3) {
    return null;
  }

  const [header, body, signature] = parts;
  const expectedSignature = sign(`${header}.${body}`, secret);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    return base64UrlDecode(body);
  } catch {
    return null;
  }
}
