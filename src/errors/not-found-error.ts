import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class NotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND

  constructor() {
    super('NOT_FOUND')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Not Found' }]
  }
}
