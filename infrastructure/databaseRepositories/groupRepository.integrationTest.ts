import Container from "typedi"
import setup, { teardown } from "../integrationsTest.setup"
import Group from "../models/Group"
import { GroupTypegooseRepository } from "./groupRepository"

describe("PartyTypegooseRepository", () => {
    beforeAll(setup)
    afterAll(teardown)

    it("should create a group", async () => {
        const groupRepository = Container.get(GroupTypegooseRepository)
        const groupName = "Chickens Bikers"

        const { id } = await groupRepository.addGroup(groupName)

        expect(await Group.findById(id)).toMatchObject({ name: groupName })
    })
})