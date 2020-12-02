import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../base/base-controller'
import { Movie } from '../../../models/movie'
import MovieService from './movie-service'

export default class MovieController extends BaseController {
  protected movieService: MovieService

  constructor() {
    super()
    this.movieService = new MovieService()
  }

  /**
   * Create a movie
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof MovieController
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const movie = new Movie()
      movie.name = req.body.name
      movie.director = req.body.director
      movie.gender = req.body.gender

      // TODO: save actors
      movie.actors = []

      const createdMovie = await this.movieService.save(movie)

      res.status(HTTPStatus.CREATED).json({
        id: createdMovie.id,
      })
    } catch (err) {
      next(err)
    }
  }
}
