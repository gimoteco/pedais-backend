import mongoose from 'mongoose'

const wrapper = {
    connect() {
        mongoose.connect('mongodb://localhost:27017/pedais', { useNewUrlParser: true })
    }
}

export default wrapper
