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

    addInterested(interested: User) {
        this.interested.push(interested)
    }
}

