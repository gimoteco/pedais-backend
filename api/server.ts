import "reflect-metadata"
import { database } from "../infrastructure/database"
import "./config"
import { graphql } from "./graphql"

export async function main() {
    database.connect(process.env.MONGODB_URI)
    const app = await graphql.configure()
    const port = process.env.PORT || 80

    app.listen({ port }, () => {
        console.log("🚀  Server ready")
    })
}

main().catch(console.error)



