import { isCelebrateError } from 'celebrate';
import STATUS_CODES from '../utilt/status-codes';
import ERROR_MESSAGES from '../utilt/error-messages';
import { ErrorRequestHandler } from 'express';

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(STATUS_CODES.BAD_DATA).send({
      message: ERROR_MESSAGES.INVALID_DATA,
    });

    return;
  }

  const statusCode = err.statusCode || STATUS_CODES.SERVER;

  const message =
    statusCode === STATUS_CODES.SERVER ? 'Ошибка на сервере' : err.message;

  res.status(statusCode).send({ message });
};

export default handleError;
