import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/business/user/user-service'
import app from '../../../src/app'
import { User } from '../../../src/models/user'
import { generateHash } from '../../../src/utils/hash'
import { getToken, IToken } from '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

let createdUser: User

let token: IToken

describe('User disable integration tests', () => {
  beforeAll(async done => {
    // creating user
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    createdUser = await userService.save({ ...mockedUser, password: hash })

    // getting token
    token = await getToken(createdUser.id)

    done()
  })

  describe('DELETE /api/user', () => {
    const endpoint = '/api/user'

    test('Should disable an user', async done => {
      const res = await request(app).delete(endpoint).set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.OK)

      done()
    })

    test('Should return USER_NOT_FOUND error when userId in token not found', async done => {
      const res = await request(app)
        .delete(endpoint)
        .set('Authorization', (await getToken(faker.random.uuid())).bearerToken)

      expect(res.status).toBe(HTTPStatus.NOT_FOUND)

      done()
    })
  })
})
