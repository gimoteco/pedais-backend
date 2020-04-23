import Container from "typedi"
import Group from "../models/Group"
import { GroupTypegooseRepository } from "./groupRepository"
import { setupInMemoryMongoDB } from "./setupInMemoryMongoDB"

describe("GroupTypegooseRepository", () => {
    setupInMemoryMongoDB()

    it("should create a group", async () => {
        const groupRepository = Container.get(GroupTypegooseRepository)
        const groupName = "Chickens Bikers"

        const { id } = await groupRepository.addGroup(groupName)

        expect(await Group.findById(id)).toMatchObject({ name: groupName })
    })
})