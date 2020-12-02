import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import app from '../src/app'
import { getToken, IToken } from './helpers'

const request = supertest

let token: IToken

describe('Invalid route test', () => {
  const endpoint = '/api/invalid-route'

  beforeAll(async done => {
    token = await getToken()

    done()
  })

  test('Should return NOT_FOUND error when try to access an invalid route', async done => {
    const res = await request(app).get(endpoint).set('Authorization', token.bearerToken)

    expect(res.status).toBe(HTTPStatus.NOT_FOUND)

    done()
  })
})
