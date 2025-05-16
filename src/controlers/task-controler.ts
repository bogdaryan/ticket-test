import { NextFunction, Request, Response } from 'express';
import Task from '../models/task';
import { TaskStatus } from '../models/types';
import STATUS_CODES from '../utilt/status-codes';
import mongoose from 'mongoose';
import { BadRequestError, NotFoundError } from '../error';
import ERROR_MESSAGES from '../utilt/error-messages';

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subject, message } = req.body;

  Task.create({ subject, message })
    .then((task) => res.status(STATUS_CODES.CREATED).send(task))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};

export const takeInWork = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  Task.findByIdAndUpdate(id, { status: TaskStatus.IN_PROGRESS }, { new: true })
    .then((task) => {
      if (!task) {
        return next(new NotFoundError(ERROR_MESSAGES.SOURCE_404));
      }

      res.send(task);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
      }

      return next(error);
    });
};

export const completeTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { resolutionText } = req.body;

  Task.findByIdAndUpdate(
    id,
    {
      status: TaskStatus.COMPLETED,
      resolutionText,
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return next(new NotFoundError(ERROR_MESSAGES.SOURCE_404));
      }

      res.send(task);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
      }

      return next(error);
    });
};

export const cancelTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { cancelReason } = req.body;

  Task.findByIdAndUpdate(
    id,
    {
      status: TaskStatus.CANCELED,
      cancelReason,
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return next(new NotFoundError(ERROR_MESSAGES.SOURCE_404));
      }

      res.json(task);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ID));
      }

      return next(error);
    });
};

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  const { date, from, to } = req.query;

  const filter: any = {};
  if (date) {
    const targetDate = new Date(date as string);
    filter.createdAt = {
      $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
      $lte: new Date(targetDate.setHours(23, 59, 59, 999)),
    };
  } else if (from && to) {
    filter.createdAt = {
      $gte: new Date(from as string),
      $lte: new Date(to as string),
    };
  }

  Task.find(filter)
    .sort({ createdAt: -1 })
    .then((tasks) => res.json(tasks))
    .catch((error) => {
      next(new BadRequestError('Ошибка при получении списка обращений'));
    });
};

export const cancelAllInProgress = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.updateMany(
    { status: TaskStatus.IN_PROGRESS },
    {
      status: TaskStatus.CANCELED,
      cancelReason: 'Отменено автоматически системой',
    }
  )
    .then((result) => {
      res.json({ message: 'Все обращения в работе отменены', result });
    })
    .catch((error) => {
      next(new BadRequestError('Ошибка при отмене обращений'));
    });
};
