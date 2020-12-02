import faker from 'faker'
import { User } from '../../src/models/user'

export function mockUser(args: { isAdmin: boolean }): User {
  const user = new User()
  user.id = faker.random.uuid()
  user.name = faker.name.firstName()
  user.email = faker.internet.email()
  user.password = faker.internet.password()
  user.isAdmin = args.isAdmin

  return user
}
