import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

export const productRouter = Router();
productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', verifyToken, requireRole('admin'), productController.create);
productRouter.put('/:id', verifyToken, requireRole('admin'), productController.update);
productRouter.delete('/:id', verifyToken, requireRole('admin'), productController.remove);