import BaseController from '../../../../base/base-controller'
import MovieService from './movie-service'

export default class MovieController extends BaseController {
  protected movieService: MovieService

  constructor() {
    super()
    this.movieService = new MovieService()
  }
}
