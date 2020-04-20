import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class UploadAsset {
    @Field()
    id: string;

    @Field()
    url: String;
}
