const TOKEN_KEY = 'caca_auth_token';

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(path, {
      ...options,
      headers,
    });
  } catch {
    throw new Error('Nao foi possivel ligar a API. Confirme que o servidor esta a correr com npm run dev.');
  }
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'O pedido nao foi concluido.');
  }

  return data;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export const apiClient = {
  register(payload) {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  login(payload) {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getProfile() {
    return request('/api/users/me');
  },

  updateProfile(payload) {
    return request('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};
