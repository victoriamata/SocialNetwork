import { User } from '../models/index.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
         res.status(404).json({ message: 'User not found by ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const updateUser = async (req:Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new: true});

      if (!user) {
        res.status(404).json({ message: 'User not found by ID' });
     } else {
       res.status(200).json(user);
     }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteUser = async (req:Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId })

      if (!user) {
        res.status(404).json({ message: 'User not found by ID' });
     } else {
       res.status(200).json(('Successfully deleted user'));
     }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const createFriend = async (req:Request, res: Response) => {
    try {
      const friend = await User.findOneAndUpdate({ _id: req.params.userId },
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

        if (!friend) {
          res.status(404).json({ message: 'User not found by ID' });
        } else {
          res.status(200).json(friend);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteFriend = async (req:Request, res: Response) => {
    try {
      const friend = await User.findById(req.params.userId);

      if (!friend) {
        return res.status(404).json({ message: 'User not found by ID' });
      }
  
      await User.updateMany(
        { friends: friend._id },
        { $pull: { friends: friend._id } },
        { new: true }
      );
  
      return res.status(200).json({ message: 'Friend successfully deleted' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }