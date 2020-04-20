import { Ctx, Query, Resolver } from "type-graphql"
import { User } from "./types/User"

@Resolver()
export class AuthResolver {

    @Query(() => User, { nullable: true })
    async me(@Ctx() { user }) {
        return user
    }
}