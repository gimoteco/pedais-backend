import { Service } from "typedi"
import UserModel from "../models/User"

@Service()
export class UserTypegooseRepository {
    async getOrCreate(email, identityProviderId) {
        let user = await UserModel.findOne({
            identityProviderId
        })

        if (!user)
            user = await UserModel.create({
                email,
                identityProviderId
            })

        return user
    }

    getMany(ids) {
        return UserModel.find({
            _id: { $in: ids }
        })
    }

    getById(id) {
        return UserModel.findById(id)
    }
}