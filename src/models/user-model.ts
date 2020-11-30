import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'name' })
  name!: string

  @Column({ name: 'email' })
  email!: string

  @Column({ name: 'password' })
  password!: string
}
