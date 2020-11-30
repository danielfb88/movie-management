import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
import { UnauthorizedError } from '../../../../errors/unauthorized-error'
import { UserNotFoundError } from '../../../../errors/user-not-found-error'
import { generateHash } from '../../../../utils/hash'
import { generateToken } from '../../../../utils/token'
import UserService from './user-service'

export default class UserController extends BaseController {
  protected userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  /**
   * Sign up
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { hash } = await generateHash(req.body.password)

      const createdUser = await this.userService.create({ ...req.body, password: hash })

      const accessToken = await generateToken({ userId: createdUser.id })

      res.status(HTTPStatus.CREATED).json({
        id: createdUser.id,
        name: createdUser.name,
        accessToken,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Sign in
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { body } = req

      const user = await this.userService.findByEmail(body.email)

      if (user === undefined) {
        throw new UserNotFoundError()
      }

      const matched = await bcrypt.compare(req.body.password, user.password)

      if (!matched) {
        throw new UnauthorizedError()
      }

      const accessToken = await generateToken({ userId: user.id })

      res.status(HTTPStatus.OK).json({ name: user.name, accessToken })
    } catch (err) {
      next(err)
    }
  }

  /**
   * // TODO
   * Update user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {}

  /**
   * // TODO
   * Disable user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async disableUser(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
