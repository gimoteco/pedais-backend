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
    interested?: string[]

    @prop()
    location?: string

    @prop()
    safetyInstructions?: string

    @prop({ ref: User })
    creator: User

    toggleInterest(interested: User) {
        if (this.interested.includes(interested.id))
            this.interested = this.interested.filter(i => i !== interested.id)
        else {
            this.interested.push(interested.id)
        }
    }
}

