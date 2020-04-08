import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import Express from 'express'
import database from "../infrastructure/database"
import { Container } from "typedi";
import { authenticate, authenticationError } from 'aws-cognito-express'
import cors from "cors"

const authMiddleware = (req, res, next) => {
    console.log(req.path, req.method)
    if (req.path === '/graphql' && req.method !== 'GET')
        authenticate({
            region: 'us-east-1',
            userPoolId: 'us-east-1_pwcl4qFOd',
            tokenUse: ['id', 'access'],
            audience: ['m8lmq1sh89pbgg1f3leqncvmn']
        })(req, res, next)
    else next()
}

const graphql = {
    async configure() {
        const schema = await buildSchema({
            resolvers: [__dirname + "/resolvers/*.{ts,js}"],
            container: Container
        })

        const server = new ApolloServer({
            schema,
            context: async ({ req }: { req: any }) => {
                const user = {
                    id: req.cognito.sub,
                    email: req.cognito.email,
                    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/kushsolitary/128.jpg'
                }
                return { user }
            }
        })

        const app = Express()

        app.use(cors())
        app.use(authMiddleware)
        app.use(authenticationError())

        server.applyMiddleware({ app })
        return app
    }
}

async function main() {
    database.connect()
    const app = await graphql.configure()

    app.listen({ port: 4000 }, () => {
        console.log(`🚀  Server ready at 4000\n`);
    });
}

main().catch(console.error)



