const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  // Directories where Jest looks for source and test files
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/'
  ],

  // Use ts-jest to transpile TypeScript files before testing
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Pattern to detect test files (*.test.ts, *.spec.ts)
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',

  // File extensions Jest will process
  moduleFileExtensions: [
    'ts',
    'js'
  ],

  // Map tsconfig "paths" aliases (e.g. ~/foo → src/foo) so Jest can resolve them
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
}
