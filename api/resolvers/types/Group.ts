import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Group {
    @Field(_ => ID)
    id: string;
    @Field()
    name: String;
    @Field()
    enabled: Boolean;
}
