import { Service } from "typedi"
import GroupModel from "../models/Group"

@Service()
export class GroupTypegooseRepository {
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