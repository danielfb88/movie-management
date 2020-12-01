import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
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

      const createdMovie = await this.movieService.save({
        name: req.body.name,
        director: req.body.director,
        gender: req.body.gender,
      })

      res.status(HTTPStatus.CREATED).json({
        id: createdMovie.id,
      })
    } catch (err) {
      next(err)
    }
  }
}
