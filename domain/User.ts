import { prop } from "@typegoose/typegoose"

export class User {
    id: string

    @prop()
    email: string

    @prop()
    avatarUrl: string
}

