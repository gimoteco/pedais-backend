import mongoose from "mongoose"

const wrapper = {
    connect() {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    }
}

export default wrapper
