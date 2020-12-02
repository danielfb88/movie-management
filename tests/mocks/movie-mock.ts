import faker from 'faker'
import { Movie } from '../../src/models/movie'

export function mockMovie(): Movie {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(2),
    director: `${faker.name.firstName()} ${faker.name.lastName()}`,
    gender: faker.random.word(),
    actors: [],
  }
}
