import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
  todoTask: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

export default mongoose?.models?.TodoSchema || mongoose.modal('TodoSchema', TodoSchema);
