import mongoose from "mongoose"

const wrapper = {
    connect() {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}

export default wrapper
