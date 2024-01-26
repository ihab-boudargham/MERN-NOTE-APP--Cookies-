import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notesRoutes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
  next(Error('Error not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Error fetching notes:', error);
  res.status(500).json({ error: 'Internal Server Error' });
});
export default app;
