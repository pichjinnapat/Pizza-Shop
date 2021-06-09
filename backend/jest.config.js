
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/'],
  collectCoverageFrom: ['libs/**', 'models/**', 'routes/**'],
  preset: 'ts-jest',
  //setupFiles: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
}
