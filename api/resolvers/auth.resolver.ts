import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "./types/User";

@Resolver()
export class AuthResolver {

    @Query(_ => User)
    async me(@Ctx() { user }) {
        return user
    }
}