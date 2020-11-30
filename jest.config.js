module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**', 'tests/**'],
  coveragePathIgnorePatterns: [
    '/tests/',
    '/node_modules/',
    '/src/middlewares/',
    '/src/migrations/',
    '/src/app.ts',
    '/src/context.ts',
    '/src/server.ts',
    'src/errors/database-connection-error.ts',
  ],
  coverageReporters: ['json-summary', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  setupFiles: ['<rootDir>/tests/setEnvVars.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/{src,tests}/**/*.test.ts?(x)'],
  testTimeout: 10000,
}
