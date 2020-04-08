import { Query, Resolver, Mutation, Arg, FieldResolver } from "type-graphql";
import GroupModel from "../../infrastructure/models/Group"
import { Service, Inject } from "typedi";
import { GroupTypegooseRepository } from "../../infrastructure/databaseRepositories/groupRepository";
import { Group } from "./types/Group";
import { GroupInput } from "./types/GroupInput";

@Service()
@Resolver(of => Group)
export class GroupResolver {
    @Inject()
    private groupRepository: GroupTypegooseRepository;

    @Query(_ => [Group])
    async groups() {
        return await this.groupRepository.getAllGroups()
    }

    @Mutation(_ => Group)
    async createGroup(@Arg("input") input: GroupInput) {
        return await GroupModel.create(input)
    }

    @Mutation(_ => Boolean)
    async removeGroup(@Arg("id") id: string) {
        const deleteResult = await this.groupRepository.removeGroup(id)
        return deleteResult.deletedCount > 0
    }

    @Mutation(_ => Boolean)
    async disableGroup(@Arg("id") id: string) {
        await this.groupRepository.disableGroup(id)
        return true
    }
}