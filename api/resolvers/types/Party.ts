import { Field, ID, ObjectType } from "type-graphql"
import { Group } from "./Group"
import { User } from "./User"

@ObjectType()
export class Party {
    @Field(_ => ID) id: string;
    @Field() name: String;

    @Field() date: Date;
    @Field() enabled: Boolean;

    @Field(_ => Group, {
        nullable: true
    }) group?: Group;

    @Field(_ => String, { defaultValue: null }) coverImage?: String;

    @Field() distance?: Number;
    @Field() elevationGain?: Number;

    @Field(_ => [User], {
        defaultValue: []
    }) interested: User[];

    @Field(_ => User, { nullable: true }) creator: User

    @Field({ nullable: true })
    coverImageUrl: String | null

    @Field({ nullable: true })
    location?: String

    @Field({ nullable: true })
    safetyInstructions?: String

    _doc: any
}
