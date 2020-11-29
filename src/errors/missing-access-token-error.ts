import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class MissingAccessTokenError extends CustomError {
  statusCode = HTTPStatus.FORBIDDEN

  constructor() {
    super('MISSING_ACCESS_TOKEN')

    Object.setPrototypeOf(this, MissingAccessTokenError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Missing access token' }]
  }
}
