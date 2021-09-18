import mongoose from 'mongoose';

import ParticipantSchema from './Participant';

const SpaceSchema = mongoose.Schema(
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
    spaceId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    music: {
      type: String,
      required: false,
    },
    admin: {
      type: ParticipantSchema,
      required: true,
    },
    participants: [ParticipantSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Spaces || mongoose.model('Spaces', SpaceSchema);
