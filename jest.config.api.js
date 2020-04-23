module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    testRegex: "\\.apiTest\\.",
    testTimeout: 10000,
    globalSetup: "<rootDir>/infrastructure/__testing/globalSetupIntegration.ts"
}