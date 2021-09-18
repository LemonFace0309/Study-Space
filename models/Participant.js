import mongoose from 'mongoose';

const ParticipantSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { _id: false }
);

export default ParticipantSchema;
