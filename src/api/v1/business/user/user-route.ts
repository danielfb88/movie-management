import { Router } from 'express'
import UserController from './user-controller'
import { signInValidation, signUpValidation } from './user-validation'

export function initUserRoutes(): Router {
  const controller = new UserController()
  const router = Router()

  router.route('/signup').post(signUpValidation, controller.signUp.bind(controller))
  router.route('/signin').post(signInValidation, controller.signIn.bind(controller))

  return router
}
