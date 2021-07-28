import mongoose from 'mongoose';
import { User } from './User';

const ObjectId = mongoose.Types.ObjectId;
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
    participants: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Spaces || mongoose.model('Spaces', SpaceSchema);
