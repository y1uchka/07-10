const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  register: (b) => request('/auth/register', { method: 'POST', body: JSON.stringify(b) }),
  login:    (b) => request('/auth/login',    { method: 'POST', body: JSON.stringify(b) }),
  logout:   ()  => request('/auth/logout',   { method: 'POST' }),
  me:       ()  => request('/auth/me'),

  getProducts:   ()     => request('/products'),
  createProduct: (b)    => request('/products',      { method: 'POST',   body: JSON.stringify(b) }),
  updateProduct: (id,b) => request(`/products/${id}`,{ method: 'PUT',    body: JSON.stringify(b) }),
  deleteProduct: (id)   => request(`/products/${id}`,{ method: 'DELETE' }),
};