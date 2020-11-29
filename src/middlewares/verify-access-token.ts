import { NextFunction, Request, Response } from 'express'
import { InvalidAccessTokenError } from '../errors/invalid-access-token-error'
import { MissingAccessTokenError } from '../errors/missing-access-token-error'
import { verifyToken } from '../utils/token'

export default async function verifyAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const publicPaths = ['/v1/health']
  const matched = publicPaths.some(path => req.path.includes(path))
  if (matched) {
    return next()
  }

  const token = req.headers.authorization
  if (token === undefined) {
    return next(new MissingAccessTokenError())
  }

  try {
    const decoded = await verifyToken(token)
    req.headers.userId = decoded.userId
  } catch (err) {
    return next(new InvalidAccessTokenError())
  }

  return next()
}
