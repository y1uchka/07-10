import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

export const authRouter = Router();
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', verifyToken, authController.me);