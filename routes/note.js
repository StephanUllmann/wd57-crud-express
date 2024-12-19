import { Router } from 'express';
import { createNote, getNotes, getSingleNote, updateNote, deleteNote } from '../controllers/note.js';

const notesRouter = Router();

//  Note CRUD
// Create Note
notesRouter.post('/', createNote);

// Get all notes
notesRouter.get('/', getNotes);

// Get one note
notesRouter.get('/:id', getSingleNote);

// Update a note
notesRouter.put('/:id', updateNote);

// Delete user
notesRouter.delete('/:id', deleteNote);

export default notesRouter;
