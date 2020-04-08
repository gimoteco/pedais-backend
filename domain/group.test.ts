import { Group } from "./Group"

describe("Group", () => {
    it('should disable', () => {
        const someGroup = new Group()

        someGroup.disable()

        expect(someGroup.enabled).toBeFalsy()
    })
})