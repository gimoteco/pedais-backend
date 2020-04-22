import { Service } from "typedi"
import PartyModel from "../models/Party"

@Service()
export class PartyTypegooseRepository {
    getAllComingSoon() {
        return PartyModel.find({ date: { $gte: new Date() } }).sort({ date: "asc" })
    }

    getAll() {
        return PartyModel.find().sort({ date: "asc" })
    }

    getById(id) {
        return PartyModel.findById(id)
    }

    async getPartiesForUser(user) {
        return PartyModel.find({
            interested: user.id
        }).sort({ date: "asc" })
    }

    async create(input, creator) {
        return PartyModel.create({
            ...input,
            creator: creator.id
        })
    }
}