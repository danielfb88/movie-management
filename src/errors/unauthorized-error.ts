import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class UnauthorizedError extends CustomError {
  statusCode = HTTPStatus.UNAUTHORIZED

  constructor() {
    super('UNAUTHORIZED')

    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Unnauthorized access' }]
  }
}
