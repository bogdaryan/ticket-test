import mongoose from 'mongoose';
import { ITask, TaskStatus } from './types';

const taskSchema = new mongoose.Schema<ITask>(
  {
    subject: {
      type: String,
      required: [true, 'Поле "subject" обязательно'],
      minlength: [2, 'Минимальная длина поля "subject" - 2'],
      maxlength: [100, 'Максимальная длина поля "subject" - 100'],
    },
    message: {
      type: String,
      required: [true, 'Поле "message" обязательно'],
      minlength: [5, 'Минимальная длина поля "message" - 5'],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.CREATED,
    },
    resolutionText: {
      type: String,
      minlength: [5, 'Минимальная длина поля "resolutionText" - 5'],
    },
    cancelReason: {
      type: String,
      minlength: [5, 'Минимальная длина поля "cancelReason" - 5'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>('Request', taskSchema);
