import { EntityRepository, Repository } from 'typeorm'
import { Movie } from '../models/movie'

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
