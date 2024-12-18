import User from './User.js';
import Note from './Note.js';
import sequelize from '../db.js';

User.hasMany(Note);
Note.belongsTo(User);

// sequelize.sync({ force: true });
sequelize.sync();

export { User, Note };
