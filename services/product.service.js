import { Product } from '../models/index.js';

export const productService = {
  getAll: () => Product.findAll(),
  getById: (id) => Product.findByPk(id),
  create: (data) => Product.create(data),
  update: async (id, data) => {
    const p = await Product.findByPk(id);
    if (!p) return null;
    await p.update(data);
    return p;
  },
  remove: async (id) => (await Product.destroy({ where: { id } })) > 0,
};