import { Field, InputType } from "type-graphql"
@InputType()
export class GroupInput {
    @Field()
    name: String;
}
