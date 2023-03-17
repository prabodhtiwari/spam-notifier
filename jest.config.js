module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts)$': ['ts-jest', {tsconfig: 'tsconfig.json'}],
  },
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  testTimeout: 300000
};
