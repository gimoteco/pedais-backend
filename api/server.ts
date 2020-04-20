import dotenv from 'dotenv';
import "reflect-metadata";
import database from "../infrastructure/database";
import { graphql } from './graphql';

dotenv.config()

async function main() {
    database.connect()
    const app = await graphql.configure()
    const port = process.env.PORT || 80

    app.listen({ port }, () => {
        console.log(`🚀  Server ready`);
    });
}

main().catch(console.error)



