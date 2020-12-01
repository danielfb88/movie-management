import { Router } from 'express'
import MovieController from './movie-controller'
import { createValidation } from './movie-validation'

export function initMovieRoutes(): Router {
  const controller = new MovieController()
  const router = Router()

  router.route('/').post(createValidation, controller.create.bind(controller))
  router.route('/').get(() => {})

  return router
}
