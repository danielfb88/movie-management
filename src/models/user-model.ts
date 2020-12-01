import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

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

  @CreateDateColumn()
  createdAt!: Timestamp

  @UpdateDateColumn()
  updatedAt!: Timestamp

  @DeleteDateColumn()
  deletedAt!: Timestamp
}
