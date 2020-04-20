import { ApolloServer } from 'apollo-server-express';
import { JWTValidator } from 'aws-cognito-express';
import cors from "cors";
import Express from 'express';
import { AuthChecker, buildSchema } from 'type-graphql';
import { Container } from "typedi";
import { UserTypegooseRepository } from '../infrastructure/databaseRepositories/userRepository';

const jwt = new JWTValidator({
    region: process.env.USER_POOL_REGION,
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: ['id', 'access'],
    audience: [process.env.USER_POOL_AUDIENCE]
});

const customAuthChecker: AuthChecker<{
    user: any;
}> = ({ context }) => {
    return !!context.user;
};

export const graphql = {
    async configure() {
        const schema = await buildSchema({
            authMode: "null",
            authChecker: customAuthChecker,
            resolvers: [__dirname + "/resolvers/*.{ts,js}"],
            container: Container
        });
        const userRepo = Container.get(UserTypegooseRepository);

        const server = new ApolloServer({
            schema,
            context: async ({ req }: {
                req: any;
            }) => {
                const token = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null;
                let payload;

                if (token) {
                    try {
                        payload = await jwt.validate(token);
                    }
                    catch { }
                }

                const user = payload ? await userRepo.getOrCreate(payload.email, payload.sub) : null;
                return { user };
            }
        });

        const app = Express();
        app.use(cors());
        server.applyMiddleware({ app });

        return app;
    }
};
