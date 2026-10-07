import { productService } from '../services/product.service.js';
import { validateProduct } from '../utils/validators.js';

export const productController = {
  getAll: async (req, res, next) => {
    try { res.json(await productService.getAll()); } catch (e) { next(e); }
  },
  getById: async (req, res, next) => {
    try {
      const p = await productService.getById(Number(req.params.id));
      if (!p) return res.status(404).json({ error: 'Not found' });
      res.json(p);
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try {
      const errors = validateProduct(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const p = await productService.create({
        title: req.body.title,
        price: Number(req.body.price),
      });
      res.status(201).json(p);
    } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const p = await productService.update(Number(req.params.id), req.body);
      if (!p) return res.status(404).json({ error: 'Not found' });
      res.json(p);
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const ok = await productService.remove(Number(req.params.id));
      if (!ok) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'deleted' });
    } catch (e) { next(e); }
  },
};