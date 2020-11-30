import { Connection } from 'typeorm'
import { Context } from '../context'

export default abstract class BaseService<T> {
  protected getConnection(): Connection {
    return Context.getInstance().db.connection
  }

  protected abstract getRepository(): T
}
