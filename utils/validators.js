export const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
export const isPositiveNumber = (v) => typeof v === 'number' && !Number.isNaN(v) && v > 0;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isValidEmail = (e) => typeof e === 'string' && EMAIL_REGEX.test(e.trim());

export const isValidPassword = (p) => {
  if (typeof p !== 'string') return false;
  if (p.length < 8 || p.length > 64) return false;
  if (!/[A-Za-z]/.test(p)) return false;
  if (!/[0-9]/.test(p)) return false;
  return true;
};

export const validateRegister = (d = {}) => {
  const e = [];
  if (!isNonEmptyString(d.name)) e.push('name is required');
  if (!isValidEmail(d.email)) e.push('email is invalid');
  if (!isValidPassword(d.password)) e.push('password must be 8-64 chars with letter and digit');
  return e;
};

export const validateLogin = (d = {}) => {
  const e = [];
  if (!isValidEmail(d.email)) e.push('email is invalid');
  if (!isNonEmptyString(d.password)) e.push('password is required');
  return e;
};

export const validateProduct = (d = {}) => {
  const e = [];
  if (!isNonEmptyString(d.title)) e.push('title is required');
  if (!isPositiveNumber(Number(d.price))) e.push('price must be positive');
  return e;
};