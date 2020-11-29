import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import app from '../src/main/app'

const request = supertest

describe('Token test', () => {
  const endpoint = '/v1/properties'

  test('Should return MISSING_ACCESS_TOKEN error when no access token', async done => {
    const res = await request(app).get(endpoint)

    expect(res.status).toBe(HTTPStatus.FORBIDDEN)

    done()
  })

  test('Should return INVALID_ACCESS_TOKEN error when request send an invalid token', async done => {
    const res = await request(app).get(endpoint).set('Authorization', faker.random.uuid())

    expect(res.status).toBe(HTTPStatus.FORBIDDEN)

    done()
  })
})
