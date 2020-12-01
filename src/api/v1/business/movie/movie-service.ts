import BaseService from '../../../../base/base-service'
import { MovieRepository } from '../../../../repositories/MovieRepository'

export default class MovieService extends BaseService<MovieRepository> {
  /**
   * Repository
   *
   * @protected
   * @return {*}  {MovieRepository}
   * @memberof MovieService
   */
  protected getRepository(): MovieRepository {
    return this.getConnection().getCustomRepository(MovieRepository)
  }
}
