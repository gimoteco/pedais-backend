import { prop } from "@typegoose/typegoose"

export class Group {
    id: string

    @prop()
    enabled = false

    @prop()
    name: string

    public disable() {
        this.enabled = false
    }
}

