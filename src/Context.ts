import { Connection } from 'typeorm'

export interface IContext {
  db: {
    connection: Connection
  }
  integrations: {}
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Context {
  private static instance: IContext

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): IContext {
    if (Context.instance === undefined) {
      throw Error('Context not defined')
    }

    return Context.instance
  }

  public static createContext(args: { connection: Connection }): void {
    const { connection } = args

    Context.instance = {
      db: {
        connection,
      },
      integrations: {},
    }
  }
}
