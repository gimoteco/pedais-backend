module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    testRegex: "\\.integrationTest\\.",
    testTimeout: 10000,
    globalSetup: "<rootDir>/infrastructure/__testing/globalSetupIntegration.ts"
}