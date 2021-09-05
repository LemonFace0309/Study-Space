import mongoose from 'mongoose';

import TodoSchema from './TodoSchema';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    todos: [TodoSchema],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friends',
      },
    ],
    type: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.User || mongoose.model('User', UserSchema);
