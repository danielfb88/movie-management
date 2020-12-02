import faker from 'faker'
import { Movie } from '../../src/models/movie'

export function mockMovie(): Movie {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    director: faker.name.firstName(),
    gender: faker.random.word(),
    actors: [],
  }
}
