import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/business/user/user-service'
import app from '../../../src/app'
import { User } from '../../../src/models/user'
import { generateHash } from '../../../src/utils/hash'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

let mockedUser: User

describe('User Sign Up integration tests', () => {
  beforeAll(async done => {
    mockedUser = mockUser({ isAdmin: false })

    done()
  })

  describe('POST /api/user/signup', () => {
    const endpoint = '/api/user/signup'

    test('Should create an user', async done => {
      const res = await request(app).post(endpoint).send(mockedUser)

      expect(res.status).toBe(HTTPStatus.CREATED)
      expect(res.body.id).toBeTruthy()
      expect(res.body.name).toBeTruthy()
      expect(res.body.accessToken).toBeTruthy()

      done()
    })

    test('Should return BAD_REQUEST error when not sent required name', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockedUser,
          name: undefined,
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required email', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockedUser,
          email: undefined,
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required password', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockedUser,
          password: undefined,
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required isAdmin flag', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockedUser,
          isAdmin: undefined,
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when sent a invalid email', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockedUser,
          email: 'invalid_email',
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when email already in use', async done => {
      const mockedUser = mockUser({ isAdmin: false })
      const { hash } = await generateHash(mockedUser.password)

      const createdUser = await userService.save({ ...mockedUser, password: hash })

      const res = await request(app)
        .post(endpoint)
        .send({
          ...createdUser,
          password: mockedUser.password,
        })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })
  })
})
