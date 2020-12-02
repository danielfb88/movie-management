import UserService from '../../../src/api/business/user/user-service'
import { User } from '../../../src/models/user'
import { generateHash } from '../../../src/utils/hash'
import { generateToken } from '../../../src/utils/token'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const userService = new UserService()

let createdUser: User

describe('Token unit tests', () => {
  beforeAll(async done => {
    await userService.deleteAll()

    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    createdUser = await userService.save({ ...mockedUser, password: hash })

    done()
  })

  test('Should generate a valid token', async done => {
    const token = await generateToken({ userId: createdUser.id })
    console.log('token: ', token)

    expect(token).toBeTruthy()

    done()
  })
})
