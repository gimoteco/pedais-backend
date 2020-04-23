import Container from "typedi"
import { setupDatabase, teardownDatabase } from "../database.testing.setup"
import Party from "../models/Party"
import User from "../models/User"
import { PartyTypegooseRepository } from "./partyRepository"

describe("PartyTypegooseRepository", () => {
    beforeAll(setupDatabase)
    afterAll(teardownDatabase)

    it("should create a party", async () => {
        const partyRepository = Container.get(PartyTypegooseRepository)
        const user = await User.create({ email: "gimoteco@gmail.com", identityProviderId: "1" })
        const input = {
            name: "Testing",
            date: new Date(),
            elevationGain: 1000,
            distance: 300
        }

        const { id } = await partyRepository.create(input, user)

        expect(await Party.findById(id)).toMatchObject(input)
    })
})