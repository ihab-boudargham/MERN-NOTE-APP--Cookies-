import * as NotesController from '../controllers/notesController';
import express from 'express';

const router = express.Router();

router.get('/', NotesController.getNotes);

router.get('/:noteId', NotesController.getNote);

router.post('/', NotesController.createNote);

export default router;
