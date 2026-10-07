import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../db/sequelize.js';

export const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});