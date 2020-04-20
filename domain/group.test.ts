import { Group } from "./Group"

describe("Group", () => {
    it("should be enabled by default", () => {
        const someGroup = new Group()

        expect(someGroup.enabled).toBeTruthy()
    })

    it("should disable", () => {
        const someGroup = new Group()

        someGroup.disable()

        expect(someGroup.enabled).toBeFalsy()
    })
})