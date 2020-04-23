import ApolloClient, { gql } from "apollo-boost"
import fetch from "node-fetch"
import { setupInMemoryMongoDB } from "../infrastructure/databaseRepositories/setupInMemoryMongoDB"
import Group from "../infrastructure/models/Group"
import "./server"

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    fetch: fetch as any,
})

describe("GraphQL api", () => {
    setupInMemoryMongoDB()

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