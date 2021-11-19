module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/**/protocols/**',
    '!<rootDir>/src/**/*protocols.ts',
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
