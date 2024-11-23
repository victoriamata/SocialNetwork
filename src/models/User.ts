import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  username: String;
  email: String;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number; 
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
   
    toJSON: {
      virtuals: true,
    },
    _id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('users', userSchema);

export default User;