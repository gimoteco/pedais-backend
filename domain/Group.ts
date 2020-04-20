import { prop } from "@typegoose/typegoose"

export class Group {
    id: string

    @prop({ default: true })
    enabled = true

    @prop()
    name: string

    public disable() {
        this.enabled = false
    }
}

