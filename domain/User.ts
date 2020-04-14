import { prop } from "@typegoose/typegoose"

export class User {
    id: string

    @prop({ unique: true })
    email: string

    @prop()
    avatarUrl: string

    @prop({ unique: true })
    identityProviderId: string
}

