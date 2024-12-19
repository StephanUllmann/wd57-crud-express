import { Note, User } from '../models/index.js';

const createNote = async (req, res) => {
  const { content, userId } = req.body;
  if (!content || !userId) return res.status(400).json({ msg: 'All field are required' });
  // some additional checks...
  try {
    const note = await Note.create({ content, userId });
    res.status(201).json({ data: note, msg: 'Note created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Note cannot be created.' });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    if (!notes) return res.status(404).json({ msg: 'No notes yet.' });
    res.json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id, { include: User });
    if (!note) return res.status(404).json({ msg: 'No note found.' });
    res.json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) return res.status(400).json({ msg: 'All field are required' });
  try {
    const rowsAffected = await Note.update({ content }, { where: { id } });
    if (!rowsAffected[0]) return res.status(404).json({ msg: 'No note found.' });
    res.json({ msg: 'Update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.destroy({ where: { id } });
    if (!note) return res.status(404).json({ msg: 'No note found to delete.' });
    res.json({ msg: 'Deletion successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export { createNote, getNotes, getSingleNote, updateNote, deleteNote };
