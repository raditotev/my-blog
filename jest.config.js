const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['fixures'],
  transformIgnorePatterns: [
    '/node_modules/(?!(remark-gfm|remark-github-blockquote-alert|micromark|micromark-.*|mdast-.*|unist-.*|unified|bail|is-plain-obj|trough|vfile|vfile-message|decode-named-character-reference|character-entities|ccount|escape-string-regexp|markdown-table)/).*',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
