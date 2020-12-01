import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ActorModel } from './actor-model'

@Entity({ name: 'movies' })
export class MovieModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  director!: string

  @Column({ nullable: false })
  gender!: string

  @OneToMany(type => ActorModel, movies => MovieModel)
  actors!: ActorModel[]
}
