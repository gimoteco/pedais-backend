import { getModelForClass } from '@typegoose/typegoose'
import { Party } from '../../domain/Party'

export default getModelForClass(Party)