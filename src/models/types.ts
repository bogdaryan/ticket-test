import mongoose from 'mongoose';

export enum TaskStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface ITask extends mongoose.Document {
  subject: string;
  message: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  resolutionText?: string;
  cancelReason?: string;
}
