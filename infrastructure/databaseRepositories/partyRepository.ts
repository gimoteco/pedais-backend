import PartyModel from "../models/Party";
import { Service } from "typedi";
import { PartyRepository } from "../../domain/PartyRepository";

@Service()
export class PartyTypegooseRepository implements PartyRepository {
    getAll() {
        return PartyModel.find()
    }

    getById(id) {
        return PartyModel.findById(id)
    }

    async create(input) {
        return PartyModel.create(input)
    }
}