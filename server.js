import express from 'express';
import chalk from 'chalk';
import { Note, User } from './models/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("It's ALIVE!");
});

//  User CRUD
// Create User
app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) return res.status(400).json({ msg: 'All field are required' });
  // some additional checks...
  try {
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json({ data: user, msg: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'User cannot be created.' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) return res.status(404).json({ msg: 'No users yet.' });
    res.json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get one user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { include: Note });
    if (!user) return res.status(404).json({ msg: 'No user found.' });
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) return res.status(400).json({ msg: 'All field are required' });
  try {
    const rowsAffected = await User.update({ firstName, lastName, email }, { where: { id } });
    if (!rowsAffected[0]) return res.status(404).json({ msg: 'No user found.' });
    res.json({ msg: 'Update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    if (!user) return res.status(404).json({ msg: 'No user found to delete.' });
    res.json({ msg: 'Deletion successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

//  Note CRUD
// Create Note
app.post('/notes', async (req, res) => {
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
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    if (!notes) return res.status(404).json({ msg: 'No notes yet.' });
    res.json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get one note
app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id, { include: User });
    if (!note) return res.status(404).json({ msg: 'No note found.' });
    res.json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
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
});

// Delete user
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.destroy({ where: { id } });
    if (!note) return res.status(404).json({ msg: 'No note found to delete.' });
    res.json({ msg: 'Deletion successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(chalk.bgGreen(` Server is listening on port ${port} `));
});
