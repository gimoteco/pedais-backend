import { Field, ID, InputType } from "type-graphql"

@InputType()
export class AddPartyInput {
    @Field()
    name: string;

    @Field()
    date: Date;

    @Field()
    elevationGain?: number;

    @Field()
    distance?: number;

    @Field(_ => ID, { nullable: true })
    group?: string;

    @Field({ nullable: true })
    coverImage?: string;

    @Field({ nullable: true })
    location?: string;

    @Field({ nullable: true })
    safetyInstructions?: string;
}
