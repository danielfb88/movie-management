import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../base/base-controller'
import { UnauthorizedError } from '../../../errors/unauthorized-error'
import { Actor } from '../../../models/actor'
import { Movie } from '../../../models/movie'
import ActorService from '../actor/actor-service'
import UserService from '../user/user-service'
import MovieService from './movie-service'

export default class MovieController extends BaseController {
  protected movieService: MovieService
  protected actorService: ActorService
  protected userService: UserService

  constructor() {
    super()
    this.movieService = new MovieService()
    this.actorService = new ActorService()
    this.userService = new UserService()
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
      if (!(await this.userService.isAdmin(req.headers.userId as string))) throw new UnauthorizedError()

      this.checkValidationErrors(req)

      const { body } = req

      const movie = new Movie()
      movie.name = body.name
      movie.director = body.director
      movie.gender = body.gender
      movie.actors = await Promise.all(
        body.actors.map(async (actorName: string) => {
          actorName = actorName.trim()
          const actor = await this.actorService.findByName(actorName)

          if (actor !== undefined) {
            return actor
          }

          const newActor = new Actor()
          newActor.name = actorName
          return await this.actorService.save(newActor)
        }),
      )

      const createdMovie = await this.movieService.save(movie)

      res.status(HTTPStatus.CREATED).json({
        id: createdMovie.id,
      })
    } catch (err) {
      next(err)
    }
  }
}
