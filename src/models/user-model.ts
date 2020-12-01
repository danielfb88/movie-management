import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  isAdmin!: boolean

  @Column({ type: 'timestamp' })
  createdAt!: Timestamp

  @Column({ type: 'timestamp' })
  updatedAt!: Timestamp

  @Column({ type: 'timestamp' })
  deletedAt!: Timestamp
}
