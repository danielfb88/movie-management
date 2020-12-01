import faker from 'faker'

interface IMockMovie {
  id: string
  name: string
  director: string
  gender: string
}

export function mockMovie(): IMockMovie {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    director: faker.name.firstName(),
    gender: faker.random.word(),
  }
}
