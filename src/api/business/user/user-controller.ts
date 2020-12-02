import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../base/base-controller'
import { UnauthorizedError } from '../../../errors/unauthorized-error'
import { UserNotFoundError } from '../../../errors/user-not-found-error'
import { User } from '../../../models/user'
import { generateHash } from '../../../utils/hash'
import { generateToken } from '../../../utils/token'
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

      const { body } = req

      const { hash } = await generateHash(body.password)

      const user = new User()
      user.name = body.name
      user.email = body.email
      user.password = hash
      user.isAdmin = body.isAdmin

      const createdUser = await this.userService.save(user)

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

      const user = await this.userService.findEnabledByEmail(body.email)

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
   * Update user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { userId } = req.headers
      const { body } = req

      const user = await this.userService.findEnabledById(userId as string)

      if (user === undefined) {
        throw new UserNotFoundError()
      }

      user.name = body.name

      const updatedUser = await this.userService.save(user)

      res.status(HTTPStatus.OK).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Disable user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async disableUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.headers

      const user = await this.userService.findEnabledById(userId as string)

      if (user === undefined) {
        throw new UserNotFoundError()
      }

      await this.userService.disableUser(userId as string)

      res.sendStatus(HTTPStatus.OK)
    } catch (err) {
      next(err)
    }
  }
}
