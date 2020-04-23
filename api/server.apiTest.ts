import ApolloClient, { gql } from "apollo-boost"
import { Amplify, Auth } from "aws-amplify"
import fetch from "node-fetch"
import { setupInMemoryMongoDB } from "../infrastructure/databaseRepositories/setupInMemoryMongoDB"
import Group from "../infrastructure/models/Group"
import "./server"
import awsExports from "./__testing/aws-exports"

(global as any).fetch = fetch

Amplify.configure(awsExports)

async function getClient(anonymous = true) {
    const user = anonymous ? null : await Auth.signIn("teste@pedais.com.br", "teste123")

    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        fetch: fetch as any,
        headers: {
            "Authorization": user ? `Bearer ${user.signInUserSession.idToken.jwtToken}` : null
        }
    })
    return client
}

describe("GraphQL api", () => {
    let anonymousClient
    setupInMemoryMongoDB()

    beforeAll(async () => {
        anonymousClient = await getClient()
    })

    it("should fetch the groups", async () => {
        const groupName = "Chickens Bikers"
        await Group.create({ name: groupName })

        const { data } = await anonymousClient
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

    xit("should get user's parties", async () => {
        const authenticatedClient = await getClient(false)

        const { data } = await authenticatedClient.query({
            query: gql`
          {
            myParties {
              name
            }
          }
        `
        })

        expect(data.myParties.length).toBe(0)
    })
})