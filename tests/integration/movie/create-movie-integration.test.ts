import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/business/user/user-service'
import app from '../../../src/app'
import { User } from '../../../src/models/user'
import { generateHash } from '../../../src/utils/hash'
import { getToken, IToken } from '../../helpers'
import { mockMovie } from '../../mocks/movie-mock'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

let token: IToken

let createdUser: User

describe('Movie creation integration tests', () => {
  beforeAll(async done => {
    // creating user
    const mockedUser = mockUser({ isAdmin: false })
    const { hash } = await generateHash(mockedUser.password)

    createdUser = await userService.save({ ...mockedUser, password: hash })

    // getting token
    token = await getToken(createdUser.id)

    done()
  })

  describe('POST /api/movie', () => {
    const endpoint = '/api/movie'

    test('Should create a movie', async done => {
      const res = await request(app).post(endpoint).send(mockMovie()).set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.CREATED)
      expect(res.body.id).toBeTruthy()

      done()
    })

    test('Should return BAD_REQUEST error when not sent required name', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockMovie(),
          name: undefined,
        })
        .set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required director', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockMovie(),
          director: undefined,
        })
        .set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent required gender', async done => {
      const res = await request(app)
        .post(endpoint)
        .send({
          ...mockMovie(),
          gender: undefined,
        })
        .set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })
  })
})
