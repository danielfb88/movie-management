import UserService from '../../../src/api/v1/business/user/user-service'
import { User } from '../../../src/models/user'
import { generateToken } from '../../../src/utils/token'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const userService = new UserService()

let createdUser: User

describe('Token unit tests', () => {
  beforeAll(async done => {
    await userService.deleteAll()

    createdUser = await userService.save(mockUser({ isAdmin: false }))

    done()
  })

  test('Should generate a valid token', async done => {
    const token = await generateToken({ userId: createdUser.id })
    console.log('token: ', token)

    expect(token).toBeTruthy()

    done()
  })
})
