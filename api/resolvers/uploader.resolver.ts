import { Arg, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { BucketManager } from "../../infrastructure/aws/bucketManager"
import { UploadAsset } from "./types/Upload"

@Service()
@Resolver()
export class UploaderResolver {
    @Inject() bucketManager: BucketManager;

    @Query(_ => UploadAsset)
    uploadUrl(@Arg("filename") filename: string) {
        return this.bucketManager.createObject(filename)
    }
}