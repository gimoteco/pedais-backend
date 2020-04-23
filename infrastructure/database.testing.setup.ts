import { MongoMemoryServer } from "mongodb-memory-server"
import database from "./database"

const server = new MongoMemoryServer()

export const setupDatabase = async () => {
    process.env.MONGODB_URI = await server.getUri()
    await database.connect()
}

export const teardownDatabase = async () => {
    await server.stop()
}