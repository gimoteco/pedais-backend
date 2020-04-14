import { Service } from "typedi";
import { PartyRepository } from "../../domain/PartyRepository";
import PartyModel from "../models/Party";

@Service()
export class PartyTypegooseRepository implements PartyRepository {
    getAll() {
        return PartyModel.find()
    }

    getById(id) {
        return PartyModel.findById(id)
    }

    async create(input, creator) {
        return PartyModel.create({
            ...input,
            creator: creator.id
        })
    }
}