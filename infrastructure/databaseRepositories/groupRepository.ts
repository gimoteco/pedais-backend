import { GroupRepository } from "../../domain/GroupRepository";
import GroupModel from "../models/Group";
import { Service } from "typedi";
import { } from "type-graphql"

@Service()
export class GroupTypegooseRepository implements GroupRepository {
    getAllGroups() {
        return GroupModel.find()
    }

    getById(id) {
        return GroupModel.findById(id)
    }

    addGroup(name: string) {
        return GroupModel.create({ name })
    }

    removeGroup(id: string) {
        return GroupModel.deleteOne({ _id: id })
    }

    disableGroup = async (id: string) => {
        const group = await GroupModel.findById(id)
        group.disable()
        return group.save()
    }
}