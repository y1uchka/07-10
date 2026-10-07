import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const SALT_ROUNDS = 12;

export const authService = {
  async register({ name, email, password }) {
    const exists = await User.findOne({ where: { email } });
    if (exists) { const e = new Error('Email already in use'); e.status = 409; throw e; }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return User.create({ name, email, password: hash });
  },

  async login({ email, password }) {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) { const e = new Error('Invalid credentials'); e.status = 401; throw e; }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) { const e = new Error('Invalid credentials'); e.status = 401; throw e; }
    return user;
  },

  generateAccessToken(user) {
    return jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
  },

  generateRefreshToken(user) {
    return jwt.sign(
      { sub: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
  },

  verifyAccessToken: (t) => jwt.verify(t, process.env.JWT_SECRET),
  verifyRefreshToken: (t) => jwt.verify(t, process.env.JWT_REFRESH_SECRET),
};