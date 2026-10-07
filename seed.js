import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sequelize } from './db/sequelize.js';
import { User } from './models/index.js';

await sequelize.sync();
const hash = await bcrypt.hash('admin123', 12);
const [admin, created] = await User.findOrCreate({
  where: { email: 'admin@mail.com' },
  defaults: { name: 'Admin', email: 'admin@mail.com', password: hash, role: 'admin' },
});
console.log(created ? 'Admin created' : 'Admin already exists');
console.log('Login: admin@mail.com / admin123');
process.exit(0);