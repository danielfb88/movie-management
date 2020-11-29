import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import app from '../src/app'
import { getMockedToken, IToken } from './helpers'

const request = supertest

let token: IToken

describe('Invalid route test', () => {
  const endpoint = '/v1/invalid-route'

  beforeAll(async done => {
    token = await getMockedToken()

    done()
  })

  test('Should return NOT_FOUND error when try to access an invalid route', async done => {
    const res = await request(app).get(endpoint).set('Authorization', token.bearerToken)

    expect(res.status).toBe(HTTPStatus.NOT_FOUND)

    done()
  })
})
