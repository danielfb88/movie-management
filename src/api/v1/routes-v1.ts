import { Router } from 'express'
import { initMovieRoutes } from './business/movie/movie-route'
import { initUserRoutes } from './business/user/user-route'

export function getRouterV1(): Router {
  const v1 = Router()

  v1.route('/health').get((req, res) => res.status(200).send()) // health check

  v1.use('/user', initUserRoutes())
  v1.use('/movie', initMovieRoutes())

  return v1
}
