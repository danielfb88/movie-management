import { Router } from 'express'
import { initMovieRoutes } from './api/business/movie/movie-route'
import { initUserRoutes } from './api/business/user/user-route'

export function getRoutes(): Router {
  const router = Router()

  router.route('/health').get((req, res) => res.status(200).send()) // health check

  router.use('/user', initUserRoutes())
  router.use('/movie', initMovieRoutes())

  return router
}
