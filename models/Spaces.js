import mongoose from 'mongoose';
import User from 'models/User';
const Schema = mongoose.Schema;
const Any = new Schema({ any: {} });
const SpaceSchema = Schema(
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
    participants: {
      type: [Any],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Spaces || mongoose.model('Spaces', SpaceSchema);
