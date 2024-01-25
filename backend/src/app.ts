import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    console.log('Server Response:', notes);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Error fetching notes:', error);
  res.status(500).json({ error: 'Internal Server Error' });
});
export default app;
