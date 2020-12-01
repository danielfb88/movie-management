import { EntityRepository, Repository } from 'typeorm'
import { ActorModel } from '../models/actor-model'

@EntityRepository(ActorModel)
export class ActorRepository extends Repository<ActorModel> {}
