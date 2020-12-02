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

describe('User update integration tests', () => {
  beforeAll(async done => {
    // creating user
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    createdUser = await userService.save({ ...mockedUser, password: hash })

    // getting token
    token = await getToken(createdUser.id)

    done()
  })

  describe('PUT /api/user', () => {
    const endpoint = '/api/user'

    test('Should update an user', async done => {
      const user = new User()
      user.name = 'New Name'

      const res = await request(app).put(endpoint).send(user).set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.OK)
      expect(res.body.id).toBe(createdUser.id)
      expect(res.body.email).toBe(createdUser.email)
      expect(res.body.isAdmin).toBe(createdUser.isAdmin)

      expect(res.body.name).toBe(user.name)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required name', async done => {
      const res = await request(app)
        .put(endpoint)
        .send({
          name: undefined,
        })
        .set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return USER_NOT_FOUND error when userId in token not found', async done => {
      const user = new User()
      user.name = 'New Name'

      const res = await request(app)
        .put(endpoint)
        .send(user)
        .set('Authorization', (await getToken(faker.random.uuid())).bearerToken)

      expect(res.status).toBe(HTTPStatus.NOT_FOUND)

      done()
    })
  })
})
