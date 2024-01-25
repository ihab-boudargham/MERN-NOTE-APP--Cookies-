import 'dotenv/config';
import express from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res) => {
  try {
    const notes = await NoteModel.find().exec();
    console.log('Server Response:', notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
