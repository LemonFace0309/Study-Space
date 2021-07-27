import mongoose from 'mongoose';

const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Room || mongoose.model('Rooms', RoomSchema);
