import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string

  @Column({ unique: true, nullable: false })
  email!: string

  @Column({ nullable: false })
  password!: string

  @Column({ nullable: false })
  isAdmin!: boolean

  @CreateDateColumn()
  createdAt!: Timestamp

  @UpdateDateColumn()
  updatedAt!: Timestamp

  @DeleteDateColumn()
  deletedAt!: Timestamp
}
