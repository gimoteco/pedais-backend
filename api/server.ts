import { ApolloServer } from 'apollo-server-express';
import { JWTValidator } from 'aws-cognito-express';
import cors from "cors";
import dotenv from 'dotenv';
import Express from 'express';
import "reflect-metadata";
import { AuthChecker, buildSchema } from 'type-graphql';
import { Container } from "typedi";
import database from "../infrastructure/database";


dotenv.config()

const jwt = new JWTValidator({
    region: 'us-east-1',
    userPoolId: 'us-east-1_pwcl4qFOd',
    tokenUse: ['id', 'access'],
    audience: ['m8lmq1sh89pbgg1f3leqncvmn']
})

export const customAuthChecker: AuthChecker<{ user: any }> = (
    { context },
) => {
    return !!context.user;
};

const graphql = {
    async configure() {
        const schema = await buildSchema({
            authMode: "null",
            authChecker: customAuthChecker,
            resolvers: [__dirname + "/resolvers/*.{ts,js}"],
            container: Container
        })

        const server = new ApolloServer({
            schema,

            context: async ({ req }: { req: any }) => {
                const token = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null
                let payload;

                if (token) {
                    try {
                        payload = await jwt.validate(token)
                    }
                    catch { }
                }

                const user = payload ? {
                    id: payload.sub,
                    email: payload.email,
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/kushsolitary/128.jpg'
                } : null
                return { user }
            }
        })

        const app = Express()

        app.use(cors())
        // app.use(authMiddleware)
        // app.use(authenticationError())

        server.applyMiddleware({ app })
        return app
    }
}

async function main() {
    database.connect()
    const app = await graphql.configure()
    const port = process.env.PORT || 80

    app.listen({ port }, () => {
        console.log(`🚀  Server ready`);
    });
}

main().catch(console.error)



