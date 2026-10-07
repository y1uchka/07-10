import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

export const connectDB = async () => {
  await sequelize.authenticate();
  console.log('DB connected');
  await sequelize.sync({ alter: true });
  console.log('Models synced');
};