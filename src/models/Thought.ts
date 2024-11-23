import { Schema, model, Document } from 'mongoose';
import reaction from './Reaction.js';

interface IThought extends Document{
  thoughtText: String;
  createdAt: Date;
  username: Schema.Types.ObjectId;
  reactions: typeof reaction[]; 
}

const thoughts = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: [true, 'Thought text required'],
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value: Date) => new Date(value.toLocaleString()),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Username required'],
    },
    reactions: [reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughts
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thoughts', thoughts);

export default Thought;