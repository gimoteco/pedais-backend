import { getModelForClass } from '@typegoose/typegoose'
import { User } from '../../domain/User'

export default getModelForClass(User)