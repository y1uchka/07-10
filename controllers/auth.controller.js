import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { validateRegister, validateLogin } from '../utils/validators.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 15 * 60 * 1000,
};

export const authController = {
  register: async (req, res, next) => {
    try {
      const errors = validateRegister(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const user = await authService.register(req.body);
      res.status(201).json({ user });
    } catch (e) { next(e); }
  },

  login: async (req, res, next) => {
    try {
      const errors = validateLogin(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const user = await authService.login(req.body);
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);
      res.cookie('accessToken', accessToken, cookieOptions);
      res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
      const { password, ...safe } = user.toJSON();
      res.json({ user: safe });
    } catch (e) { next(e); }
  },

  logout: (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  },

  me: async (req, res, next) => {
    try {
      const user = await userService.getById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (e) { next(e); }
  },
};