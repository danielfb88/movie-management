import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/v1/business/user/user-service'
import app from '../../../src/app'
import { generateHash } from '../../../src/utils/hash'
import '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

describe('User Sign Up integration tests', () => {
  beforeAll(async done => {
    done()
  })

  describe('POST /v1/user/signup', () => {
    const endpoint = '/v1/user/signup'

    test('Should create an user', async done => {
      const res = await request(app)
        .post(endpoint)
        .send(mockUser({ isAdmin: false }))

      expect(res.status).toBe(HTTPStatus.CREATED)
      expect(res.body.id).toBeTruthy()
      expect(res.body.name).toBeTruthy()
      expect(res.body.accessToken).toBeTruthy()

      done()
    })

    test('Should return BAD_REQUEST error when not sent required name', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app).post(endpoint).send({
        name: undefined,
        email: mockedUser.email,
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required email', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app).post(endpoint).send({
        name: mockedUser.name,
        email: undefined,
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required password', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app).post(endpoint).send({
        name: mockedUser.name,
        email: mockedUser.email,
        password: undefined,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required isAdmin flag', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app).post(endpoint).send({
        name: mockedUser.name,
        email: mockedUser.email,
        password: undefined,
        isAdmin: undefined,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when sent a invalid email', async done => {
      const mockedUser = mockUser({ isAdmin: false })

      const res = await request(app).post(endpoint).send({
        name: mockedUser.name,
        email: 'invalid_email',
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when email already in use', async done => {
      const mockedUser = mockUser({ isAdmin: false })
      const createdUser = await userService.save({
        ...mockUser({ isAdmin: false }),
        password: await generateHash(mockedUser.password),
      })

      const res = await request(app).post(endpoint).send({
        name: createdUser.name,
        email: createdUser.email,
        password: mockedUser.password,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })
  })
})
