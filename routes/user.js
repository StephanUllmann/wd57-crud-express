import { Router } from 'express';
import { createUser, getUsers, getSingleUser, updateUser, deleteUser } from '../controllers/user.js';

const userRouter = Router();
//  User CRUD
// Create User
userRouter.post('/', createUser);

// Get all users
userRouter.get('/', getUsers);

// Get one user
userRouter.get('/:id', getSingleUser);

// Update a user
userRouter.put('/:id', updateUser);

// Delete user
userRouter.delete('/:id', deleteUser);

export default userRouter;
