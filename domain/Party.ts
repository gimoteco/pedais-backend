import { prop } from "@typegoose/typegoose"
import { Group } from "./Group"
import { User } from "./User"

export class Party {
    id: string

    @prop({ default: true })
    enabled: Boolean

    @prop()
    name: string

    @prop({ default: undefined })
    coverImage?: string

    @prop()
    date: Date

    @prop()
    distance?: number

    @prop()
    elevationGain?: number

    @prop({ ref: Group })
    group?: Group

    @prop({ ref: User, default: [] })
    interested?: User[]

    toggleInterest(interested: User) {
        if (this.interested.some(i => i.id === interested.id))
            this.interested = this.interested.filter(i => i.id !== interested.id)
        else {
            this.interested.push(interested)
        }
    }
}

