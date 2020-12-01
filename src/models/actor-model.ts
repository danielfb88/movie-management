import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MovieModel } from './movie-model'

@Entity({ name: 'actors' })
export class ActorModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string

  @ManyToOne(type => ActorModel, movies => MovieModel, { eager: true })
  movie!: MovieModel
}
