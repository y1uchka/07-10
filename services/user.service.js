import { User } from '../models/index.js';

export const userService = {
  getAll: () => User.findAll(),
  getById: (id) => User.findByPk(id),
  remove: async (id) => (await User.destroy({ where: { id } })) > 0,
};