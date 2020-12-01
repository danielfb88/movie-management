import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import UserService from '../../../src/api/v1/business/user/user-service'
import { IUserUpdateRequest } from '../../../src/api/v1/business/user/user-types'
import app from '../../../src/app'
import { generateHash } from '../../../src/utils/hash'
import { getToken, IToken } from '../../helpers'
import { mockUser } from '../../mocks/user-mock'

const request = supertest
const userService = new UserService()

const mockedUser = mockUser({ isAdmin: false })

let token: IToken

describe('User update integration tests', () => {
  beforeAll(async done => {
    // creating user
    const { hash } = await generateHash(mockedUser.password)
    await userService.save({ ...mockedUser, password: hash })

    // getting token
    token = await getToken(mockedUser.id)

    done()
  })

  describe('PUT /v1/user', () => {
    const endpoint = '/v1/user'

    test('Should update an user', async done => {
      const userUpdateRequest: IUserUpdateRequest = {
        name: 'New Name',
      }

      const res = await request(app).put(endpoint).send(userUpdateRequest).set('Authorization', token.bearerToken)

      expect(res.status).toBe(HTTPStatus.OK)
      expect(res.body.id).toBe(mockedUser.id)
      expect(res.body.email).toBe(mockedUser.email)
      expect(res.body.isAdmin).toBe(mockedUser.isAdmin)

      expect(res.body.name).toBe(userUpdateRequest.name)

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
      const userUpdateRequest: IUserUpdateRequest = {
        name: 'New Name',
      }

      const res = await request(app)
        .put(endpoint)
        .send(userUpdateRequest)
        .set('Authorization', (await getToken(faker.random.uuid())).bearerToken)

      expect(res.status).toBe(HTTPStatus.NOT_FOUND)

      done()
    })
  })
})
