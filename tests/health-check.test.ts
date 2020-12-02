import supertest from 'supertest'
import app from '../src/app'
import './helpers'

const request = supertest

describe('Health check test', () => {
  const endpoint = '/api/health'

  test('Should health check api', async done => {
    const res = await request(app).get(endpoint)
    expect(res.status).toBe(200)
    done()
  })
})
