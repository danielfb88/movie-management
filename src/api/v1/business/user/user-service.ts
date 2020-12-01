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
   * Find by Id
   *
   * @param {string} id
   * @return {*}  {(Promise<UserModel | undefined>)}
   * @memberof UserService
   */
  async findById(id: string): Promise<UserModel | undefined> {
    return await this.getRepository().findOne({ id })
  }

  /**
   * Create or update user
   *
   * @param {UserModel} user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async save(user: object): Promise<UserModel> {
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
