import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/sequelize.js';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/product.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('API is running'));
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});