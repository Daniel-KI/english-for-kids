import express from 'express';
import { UserModel } from '../models/UserModel';

const UserRouter = express.Router();

// GET SPECIFIC USER
UserRouter.get('/login', async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModel.findOne({ login: req.query.login, password: req.query.password });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

UserRouter.get('/id', async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.query._id });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET ALL USERS
UserRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const users = await UserModel.find().limit(8); // limit = 8
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// ADD NEW USER
UserRouter.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const user = new UserModel({
      login: req.body.login,
      password: req.body.password,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE USER
UserRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const removedUser = await UserModel.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE USER
UserRouter.patch('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const updatedUser = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          login: req.body.login,
          password: req.body.password,
        },
      },
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

export default UserRouter;
