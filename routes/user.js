import { Router } from 'express';
import { createUser, getUsers, getSingleUser, updateUser, deleteUser } from '../controllers/user.js';
import validateUser from '../middlewares/validateUser.js';
const userRouter = Router();

function someMiddlewareFunction(req, res, next) {
  console.log('MIDDLEWARE HIT');

  return res.status(403).send('NOT ALLOWED');

  next();
}

// userRouter.use(someMiddlewareFunction);

//  User CRUD
// Create User
userRouter.post('/', validateUser, createUser);

// Get all users
userRouter.get('/', getUsers);

// Get one user
userRouter.get('/:id', getSingleUser);

// Update a user
userRouter.put('/:id', validateUser, updateUser);

// Delete user
userRouter.delete('/:id', deleteUser);

export default userRouter;
