import faker from 'faker'
import { UserModel } from '../../src/models/user-model'

export function mockUser(args: { isAdmin: boolean }): UserModel {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    isAdmin: args.isAdmin,
  }
}
