import { NextFunction, Request, Response } from 'express'
import { ApiNotFoundError } from '../errors/api-not-found-error'

export default function throw404(req: Request, res: Response, next: NextFunction): void {
  next(new ApiNotFoundError())
}
