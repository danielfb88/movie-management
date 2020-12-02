import BaseService from '../../../base/base-service'
import { Movie } from '../../../models/movie'
import { MovieRepository } from '../../../repositories/MovieRepository'

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
   * @param {Movie} movie
   * @return {*}  {Promise<MovieModel>}
   * @memberof MovieService
   */
  async save(movie: Movie): Promise<Movie> {
    return await this.getRepository().save(movie)
  }

  /**
   * Find by Id
   *
   * @param {string} id
   * @return {*}  {(Promise<Movie | undefined>)}
   * @memberof MovieService
   */
  async findById(id: string): Promise<Movie | undefined> {
    return await this.getRepository().findOne({ id })
  }
}
