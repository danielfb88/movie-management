import { IsNull } from 'typeorm'
import BaseService from '../../../../base/base-service'
import { User } from '../../../../models/user'
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
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.getRepository().findOne({ email })
  }

  /**
   * Find enabled by email
   *
   * @param {string} email
   * @return {*}  {(Promise<UserModel | undefined>)}
   * @memberof UserService
   */
  async findEnabledByEmail(email: string): Promise<User | undefined> {
    return await this.getRepository().findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    })
  }

  /**
   * Find by Id
   *
   * @param {string} id
   * @return {*}  {(Promise<UserModel | undefined>)}
   * @memberof UserService
   */
  async findById(id: string): Promise<User | undefined> {
    return await this.getRepository().findOne({ id })
  }

  /**
   * Find enabled by Id
   *
   * @param {string} id
   * @return {*}  {(Promise<UserModel | undefined>)}
   * @memberof UserService
   */
  async findEnabledById(id: string): Promise<User | undefined> {
    return await this.getRepository().findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    })
  }

  /**
   * Create or update user
   *
   * @param {User} user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async save(user: object): Promise<User> {
    return await this.getRepository().save(user)
  }

  /**
   * Disable user
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof UserService
   */
  async disableUser(id: string): Promise<void> {
    await this.getRepository().save({ id, deletedAt: new Date() })
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
