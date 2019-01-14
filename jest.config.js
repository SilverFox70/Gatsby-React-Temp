module.exports = {
  transform: { '^.+\\.jsx?$': '<rootDir>/test/transformer.js' },
  testRegex: '(\\.(test|spec))\\.(jsx|js)$',
  testPathIgnorePatterns: ['/node_modules/', '/public/', '/.cache/'],
}
