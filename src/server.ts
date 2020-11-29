import * as http from 'http'
import { createConnection, getConnectionOptions } from 'typeorm'
import app from './app'
import { Context } from './context'

const server = http.createServer(app)

getConnectionOptions()
  .then(async options => {
    return await createConnection({
      ...options,
      migrationsRun: true,
    })
  })
  .then(connection => {
    Context.createContext({ connection })

    const port = process.env.PORT ?? '8000'

    server.listen(parseInt(port, 10))
    server.on('listening', () => console.log(`Server running on ${port}`))
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`An error has occurred: ${JSON.stringify(error)}`))
  })
  .catch(error => console.error(error))
