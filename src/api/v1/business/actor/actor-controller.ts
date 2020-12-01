import BaseController from '../../../../base/base-controller'
import ActorService from './actor-service'

export default class ActorController extends BaseController {
  protected actorService: ActorService

  constructor() {
    super()
    this.actorService = new ActorService()
  }
}
