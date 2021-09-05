import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
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
