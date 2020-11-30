import UserService from '../../../src/api/v1/business/user/user-service'
import { UserModel } from '../../../src/models/user-model'
import { generateToken } from '../../../src/utils/token'
import { mockUser } from '../../mocks/user-mock'
require('../../helpers')

const userService = new UserService()

let createdUser: UserModel

describe('Token unit tests', () => {
  beforeAll(async done => {
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())

    done()
  })

  test('Should generate a valid token', async done => {
    const token = await generateToken({ userId: createdUser.id })
    console.log('token: ', token)

    expect(token).toBeTruthy()

    done()
  })
})
