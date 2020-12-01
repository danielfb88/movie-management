import faker from 'faker'

interface IMockUser {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export function mockUser(args: { isAdmin: boolean }): IMockUser {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    isAdmin: args.isAdmin,
  }
}
