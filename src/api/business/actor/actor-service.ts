import BaseService from '../../../base/base-service'
import { ActorRepository } from '../../../repositories/ActorRepository'

export default class ActorService extends BaseService<ActorRepository> {
  /**
   * Repository
   *
   * @protected
   * @return {*}  {ActorRepository}
   * @memberof ActorService
   */
  protected getRepository(): ActorRepository {
    return this.getConnection().getCustomRepository(ActorRepository)
  }
}
