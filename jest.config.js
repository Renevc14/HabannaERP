module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/tests/**/*.test.ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts']
};
