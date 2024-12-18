import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Note = sequelize.define(
  'note',
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

// Note.sync();

export default Note;
