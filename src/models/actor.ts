import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string
}
