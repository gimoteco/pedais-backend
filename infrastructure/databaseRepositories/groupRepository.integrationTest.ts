import Container from "typedi"
import { setupDatabase, teardownDatabase } from "../database.testing.setup"
import Group from "../models/Group"
import { GroupTypegooseRepository } from "./groupRepository"

describe("PartyTypegooseRepository", () => {
    beforeAll(setupDatabase)
    afterAll(teardownDatabase)

    it("should create a group", async () => {
        const groupRepository = Container.get(GroupTypegooseRepository)
        const groupName = "Chickens Bikers"

        const { id } = await groupRepository.addGroup(groupName)

        expect(await Group.findById(id)).toMatchObject({ name: groupName })
    })
})