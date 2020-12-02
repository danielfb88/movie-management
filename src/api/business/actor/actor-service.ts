import BaseService from '../../../base/base-service'
import { Actor } from '../../../models/actor'
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

  /**
   * Save
   *
   * @param {Actor} actor
   * @return {*}  {Promise<Actor>}
   * @memberof ActorService
   */
  async save(actor: Actor): Promise<Actor> {
    return await this.getRepository().save(actor)
  }

  /**
   * Find by name
   *
   * @param {string} name
   * @return {*}  {(Promise<Actor | undefined>)}
   * @memberof ActorService
   */
  async findByName(name: string): Promise<Actor | undefined> {
    return await this.getRepository().findOne({ name })
  }
}
