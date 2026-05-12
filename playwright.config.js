module.exports = {
  testDir: '.',
  testIgnore: ['**/*.test.js'],
  use: { browserName: 'chromium', headless: true },
  retries: 0,
};