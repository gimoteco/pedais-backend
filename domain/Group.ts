import { prop } from "@typegoose/typegoose"

export class Group {
    id: string

    @prop({ default: true })
    enabled: boolean = true

    @prop()
    name: string

    public disable() {
        this.enabled = false
    }
}

