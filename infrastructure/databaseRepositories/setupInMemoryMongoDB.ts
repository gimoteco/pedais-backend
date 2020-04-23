import { database } from "../database"

export function setupInMemoryMongoDB() {
    beforeAll(async () => {
        await database.connect(process.env.MONGODB_URI)
    })

    beforeEach(() => {
        database.connection.connections[0].db.dropDatabase()
    })

    afterAll(() => {
        database.disconnect()
    })
}
