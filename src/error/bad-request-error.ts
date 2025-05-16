import STATUS_CODES from '../utilt/status-codes';

class BadRequestError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_DATA;
  }
}

export default BadRequestError;
