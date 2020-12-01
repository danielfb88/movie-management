import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Actor } from './actor'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  director!: string

  @Column({ nullable: false })
  gender!: string

  @ManyToMany(type => Actor)
  @JoinTable()
  actors!: Actor[]
}
