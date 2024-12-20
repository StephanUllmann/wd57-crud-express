import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/user.js';
import notesRouter from './routes/note.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("It's ALIVE!");
});

app.use('/users', morgan('dev'), userRouter);
app.use('/notes', notesRouter);

app.use(function errorHandler(err, req, res, next) {
  console.error(err);
  res.json({ msg: 'We messed up' });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(` Server is listening on port ${port} `));
});
