import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ActorModel } from './actor-model'

@Entity({ name: 'movies' })
export class MovieModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  director!: string

  @Column()
  gender!: string

  @OneToMany(type => ActorModel, movies => MovieModel)
  actors!: ActorModel[]
}
