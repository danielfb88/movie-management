import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class ApiNotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND

  constructor() {
    super('API_NOT_FOUND')

    Object.setPrototypeOf(this, ApiNotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Not Found' }]
  }
}
