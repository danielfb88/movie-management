import { EntityRepository, Repository } from 'typeorm'
import { MovieModel } from '../models/movie-model'

@EntityRepository(MovieModel)
export class MovieRepository extends Repository<MovieModel> {}
