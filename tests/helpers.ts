import { randomBytes } from 'crypto'
import faker from 'faker'
import 'reflect-metadata'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { Context, IContext } from '../src/context'
import { generateToken } from '../src/utils/token'

process.env.TZ = 'UTC'

const FAKER_SEED = parseInt(process.env.FAKER_SEED ?? '0', 10)

console.log(`FAKER SEED: ${FAKER_SEED}`)

const databaseName = `test_${randomBytes(8).toString('hex')}`
let masterConn: Connection
let connection: Connection

beforeAll(async () => {
  jest.setTimeout(600 * 1000)

  faker.seed(FAKER_SEED)

  try {
    masterConn = await createConnection({
      ...(await getConnectionOptions()),
      name: 'master',
    })

    await masterConn.query(`CREATE DATABASE ${databaseName};`)

    connection = await createConnection({
      ...((await getConnectionOptions()) as PostgresConnectionOptions),
      database: databaseName,
      logging: false,
      migrationsRun: true,
    })

    Context.createContext({ connection })
  } catch (err) {
    process.stderr.write(`${JSON.stringify(err)}\n${JSON.stringify(err.stack)}\n`)
    process.exit(1)
  }
}, 60000)

afterAll(async () => {
  await connection.close()
  await masterConn.query(`DROP DATABASE ${databaseName};`)
  await masterConn.close()
})

export interface IToken {
  bearerToken: string
  userId: string
}

export function makeCtx(ctx: Partial<IContext>): Context {
  const context: IContext = {
    db: {
      connection,
    },
    integrations: {},
    ...ctx,
  }

  return context
}

export async function getMockedToken(): Promise<IToken> {
  const userId = faker.random.uuid()
  const bearerToken = `Bearer ${await generateToken({ userId })}`
  return {
    bearerToken,
    userId,
  }
}
