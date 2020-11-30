import { Router } from 'express'
import { initUserRoutes } from './business/user/user-route'

export function getRouterV1(): Router {
  const v1 = Router()

  v1.route('/health').get((req, res) => res.status(200).send()) // health check
  v1.use('/user', initUserRoutes())

  return v1
}
