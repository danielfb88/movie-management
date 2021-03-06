import UserService from '../../../src/api/business/user/user-service'
import { generateHash } from '../../../src/utils/hash'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const userService = new UserService()

describe('User find unit tests', () => {
  test('Should find enabled user by email', async done => {
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    await userService.save({ ...mockedUser, password: hash })

    const user = await userService.findEnabledByEmail(mockedUser.email)

    expect(user).not.toBeUndefined()

    done()
  })

  test('Should not find disabled user by email', async done => {
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    await userService.save({ ...mockedUser, password: hash })

    await userService.disableUser(mockedUser.id)

    const user = await userService.findEnabledByEmail(mockedUser.email)

    expect(user).toBeUndefined()

    done()
  })

  test('Should find enabled user by id', async done => {
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    await userService.save({ ...mockedUser, password: hash })

    const user = await userService.findEnabledById(mockedUser.id)

    expect(user).not.toBeUndefined()

    done()
  })

  test('Should not find disabled user by id', async done => {
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    await userService.save({ ...mockedUser, password: hash })

    await userService.disableUser(mockedUser.id)

    const user = await userService.findEnabledById(mockedUser.id)

    expect(user).toBeUndefined()

    done()
  })
})
