import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/v1/business/user/user-service'
import app from '../../../src/app'
import { generateHash } from '../../../src/utils/hash'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

const mockedUser = mockUser({ isAdmin: false })

describe('User Sign In integration tests', () => {
  beforeAll(async done => {
    const { hash } = await generateHash(mockedUser.password)
    await userService.save({ ...mockedUser, password: hash })

    done()
  })

  describe('POST /v1/user/signin/', () => {
    const endpoint = '/v1/user/signin'

    test('Should sign in user', async done => {
      const res = await request(app).post(endpoint).send({
        email: mockedUser.email,
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.OK)
      expect(res.body.name).toBeTruthy()
      expect(res.body.accessToken).toBeTruthy()

      done()
    })

    test('Should return UNAUTHORIZED when unnauthorized access', async done => {
      const res = await request(app).post(endpoint).send({
        email: mockedUser.email,
        password: 'wrong-password',
      })

      expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

      done()
    })

    test('Should return BAD_REQUEST error when sent an invalid email', async done => {
      const res = await request(app).post(endpoint).send({
        email: 'invalid_email',
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent a required email', async done => {
      const res = await request(app).post(endpoint).send({
        email: undefined,
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent a required password', async done => {
      const res = await request(app).post(endpoint).send({
        email: mockedUser.email,
        password: undefined,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return NOT FOUND error when email not exists in database', async done => {
      const res = await request(app).post(endpoint).send({
        email: 'vegeta@ssj.com.br',
        password: faker.random.uuid(),
      })

      expect(res.status).toBe(HTTPStatus.NOT_FOUND)

      done()
    })
  })
})
