import mongoose from "mongoose"

let connection: typeof mongoose

export const database = {
    async connect(uri) {
        connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        return connection
    },
    async disconnect() {
        return connection && connection.disconnect()
    },

    get connection() {
        return connection
    }
}