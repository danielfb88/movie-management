import BaseService from '../../../../base/base-service'
import { MovieModel } from '../../../../models/movie-model'
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

  /**
   * Create or update movie
   *
   * @param {object} movie
   * @return {*}  {Promise<MovieModel>}
   * @memberof MovieService
   */
  async save(movie: object): Promise<MovieModel> {
    return await this.getRepository().save(movie)
  }
}
