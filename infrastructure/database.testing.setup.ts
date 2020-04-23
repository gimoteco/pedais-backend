import { MongoMemoryServer } from "mongodb-memory-server"
import database from "./database"

const server = new MongoMemoryServer({
    instance: {
        port: 27017,
        dbName: "pedais"
    }
})

export const setupDatabase = async () => {
    await server.start()
    await database.connect()
}

export const teardownDatabase = async () => {
    await server.stop()
}