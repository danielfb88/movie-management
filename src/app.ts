import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { handleError } from './middlewares/handle-error'
import throw404 from './middlewares/throw-404'
import verifyAccessToken from './middlewares/verify-access-token'
import { getRoutes } from './routes'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.middlewares()
  }

  middlewares(): void {
    this.app.use(morgan('dev'))
    this.app.use(cors())

    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())

    this.app.use(verifyAccessToken)
    this.loadRoutes()

    this.app.use(throw404)
    this.app.use(handleError)
  }

  loadRoutes(): void {
    this.app.use('/api', getRoutes())
  }
}
export default new App().app
