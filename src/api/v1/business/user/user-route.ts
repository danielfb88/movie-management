import { Router } from 'express'
import UserController from './user-controller'
import { signInValidation, signUpValidation, updateValidation } from './user-validation'

export function initUserRoutes(): Router {
  const controller = new UserController()
  const router = Router()

  router.route('/signup').post(signUpValidation, controller.signUp.bind(controller))
  router.route('/signin').post(signInValidation, controller.signIn.bind(controller))
  router.route('/').put(updateValidation, controller.update.bind(controller))
  router.route('/').delete(controller.disableUser.bind(controller))

  return router
}
