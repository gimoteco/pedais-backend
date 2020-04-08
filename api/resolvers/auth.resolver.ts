import { Query, Resolver, Ctx } from "type-graphql";
import { User } from "./types/User";

@Resolver()
export class AuthResolver {

    @Query(_ => User)
    async me(@Ctx() { user }) {
        return {
            id: user.sub,
            email: user.email
        }
    }
}