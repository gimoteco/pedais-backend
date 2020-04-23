import ApolloClient, { gql } from "apollo-boost"
import fetch from "node-fetch"
import { setupDatabase, teardownDatabase } from "../infrastructure/database.testing.setup"
import Group from "../infrastructure/models/Group"
import "./server"

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    fetch: fetch as any,
})

beforeAll(setupDatabase)
afterAll(teardownDatabase)

describe("GraphQL api", () => {
    it("should fetch the groups", async () => {
        const groupName = "Chickens Bikers"
        await Group.create({ name: groupName })

        const { data } = await client
            .query({
                query: gql`
              {
                groups {
                  name
                }
              }
            `
            })

        expect(data.groups.length).toBe(1)
        expect(data.groups[0]).toMatchObject({ name: groupName })
    })
})