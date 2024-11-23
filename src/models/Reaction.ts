import { Schema, Document, Types } from 'mongoose';

interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reaction = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value: Date) => new Date(value.toLocaleString()), 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

export default reaction;