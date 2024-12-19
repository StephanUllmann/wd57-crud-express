import express from 'express';
import chalk from 'chalk';
import userRouter from './routes/user.js';
import notesRouter from './routes/note.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("It's ALIVE!");
});

app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.listen(port, () => {
  console.log(chalk.bgGreen(` Server is listening on port ${port} `));
});
