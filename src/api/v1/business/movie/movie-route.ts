import { Router } from 'express'
import { defaultValidation } from './movie-validation'

export function initMovieRoutes(): Router {
  // const controller = new MovieController()
  const router = Router()

  router.route('/').post(defaultValidation, () => {})
  router.route('/').get(defaultValidation, () => {})

  return router
}
