import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    action: {
      type: String,
      required: true,
    },
  });

  export const LogModel = mongoose.model('Logs', logSchema);