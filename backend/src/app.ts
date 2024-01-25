import 'dotenv/config';
import express from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
