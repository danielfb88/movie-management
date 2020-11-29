import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class InvalidAccessTokenError extends CustomError {
  statusCode = HTTPStatus.FORBIDDEN

  constructor() {
    super('INVALID_ACCESS_TOKEN')

    Object.setPrototypeOf(this, InvalidAccessTokenError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Invalid access token' }]
  }
}
