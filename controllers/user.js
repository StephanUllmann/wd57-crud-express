import { User, Note } from '../models/index.js';

const createUser = async (req, res) => {
  try {
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json({ data: user, msg: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'User cannot be created.' });
  }
};

const getUsers = async (req, res) => {
  // throw Error('AAARRGH');
  const users = await User.findAll();
  if (!users.length) return res.status(404).json({ msg: 'No users yet.' });
  res.json({ data: users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { include: Note });
    if (!user) return res.status(404).json({ msg: 'No user found.' });
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsAffected = await User.update({ firstName, lastName, email }, { where: { id } });
    if (!rowsAffected[0]) return res.status(404).json({ msg: 'No user found.' });
    res.json({ msg: 'Update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    if (!user) return res.status(404).json({ msg: 'No user found to delete.' });
    res.json({ msg: 'Deletion successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export { createUser, getUsers, getSingleUser, updateUser, deleteUser };
