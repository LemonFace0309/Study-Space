import mongoose from 'mongoose';

const FriendsSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    requester_email: {
      type: String,
    },
    recipient_email: {
      type: String,
    },
    status: {
      type: Number,
      enums: [
        0, //'not friends',
        1, //'requested',
        2, //'friends'
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Friends || mongoose.model('Friends', FriendsSchema);
