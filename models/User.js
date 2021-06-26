import mongoose from 'mongoose';

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
    password: {
      type: String,
      required: true,
      trim: true,
    },
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
