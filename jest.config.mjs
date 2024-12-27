// jest.config.mjs
export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform .ts and .tsx files using ts-jest
  },
  testMatch: [
    '**/tests/**/*.[jt]s?(x)', // Match any test files in the tests folder
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match test or spec files anywhere in the project
  ],
  testPathIgnorePatterns: [
    '/node_modules/', // Ignore files in the node_modules folder
    '/dist/', // Ignore files in the dist folder (build output)
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'], // Recognize js, ts, and tsx files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: If you need additional setup
  globals: {
    'ts-jest': {
      isolatedModules: true, // Improves performance in TypeScript
    },
  },
};
