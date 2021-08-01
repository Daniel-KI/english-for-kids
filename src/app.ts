import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import UserRouter from './routes/UserRouter';
import WordRouter from './routes/WordRouter';
import CategoryRouter from './routes/CategoryRouter';

// CONFIG
const PORT = process.env.PORT || 5000;
const DB_CONNECTION: string = process.env.DB_CONNECTION || '';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/uploads', express.static('uploads'));
app.use('/users', UserRouter);
app.use('/words', WordRouter);
app.use('/categories', CategoryRouter);

async function start() {
  try {
    await mongoose
      .connect(DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log('Database connected!'))
      .catch((err) => console.log(err));
    app.listen(PORT, () => {
      console.log(`Server has been started np port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`Server has been started on port ${PORT}`);
});
