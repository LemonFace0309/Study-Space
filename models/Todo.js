import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

export default TodoSchema;
