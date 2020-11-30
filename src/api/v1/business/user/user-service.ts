import BaseService from '../../../../base/base-service'
import { UserModel } from '../../../../models/user-model'
import { UserRepository } from '../../../../repositories/UserRepository'

export default class UserService extends BaseService<UserRepository> {
  /**
   * Repository
   *
   * @protected
   * @return {*}  {UserRepository}
   * @memberof UserService
   */
  protected getRepository(): UserRepository {
    return this.getConnection().getCustomRepository(UserRepository)
  }

  /**
   * Find by email
   *
   * @param {string} email
   * @return {*}  {(Promise<User | undefined>)}
   * @memberof UserService
   */
  async findByEmail(email: string): Promise<UserModel | undefined> {
    return await this.getRepository().findOne({ email })
  }

  /**
   * Create new user
   *
   * @param {UserModel} user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async create(user: object): Promise<UserModel> {
    return await this.getRepository().save(user)
  }

  /**
   * Delete all users
   *
   * @return {*}  {Promise<void>}
   * @memberof UserService
   */
  async deleteAll(): Promise<void> {
    await this.getRepository().delete({})
  }
}
