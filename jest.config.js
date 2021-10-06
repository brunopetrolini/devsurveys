module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  preset: '@shelf/jest-mongodb',
};
