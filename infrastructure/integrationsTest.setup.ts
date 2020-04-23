import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import database from "./database"

const server = new MongoMemoryServer()

export default async () => {

    process.env.MONGODB_URI = await server.getUri()
    await database.connect()
}

export const teardown = async () => {
    await server.stop()
    await mongoose.stop()
}