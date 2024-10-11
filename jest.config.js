module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    coverageReporters: ['html'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1'
    },
  };
