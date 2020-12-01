import { Router } from 'express'
import { defaultValidation } from './actor-validation'

export function initActorRoutes(): Router {
  // const controller = new ActorController()
  const router = Router()

  router.route('/').post(defaultValidation, () => {})

  return router
}
