module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    'branches': 80,
    'functions': 80,
    'lines': 80,
    'statements': 0
  },
  // moduleNameMapper: {},
  testEnvironment: 'node',
};
