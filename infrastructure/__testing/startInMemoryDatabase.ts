import { MongoMemoryServer } from "mongodb-memory-server"

const server = new MongoMemoryServer({
    instance: {
        port: 27017,
        dbName: "pedais"
    }
})

export async function startInMemoryDatabase() {
    const running = await server.start()
    const uri = await server.getUri()

    if (running) console.log(`In memory running on ${uri}`)
    return uri
}