import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class DefaultInformations {
    @Field()
    safetyInstructions: String;
}
