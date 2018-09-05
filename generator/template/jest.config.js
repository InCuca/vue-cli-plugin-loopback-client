module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    'test/**/*.js',
    '!**/*.spec.js',
    '!**/node_modules/**',
  ],
  projects: [
    {
      displayName: 'test tools',
      testMatch: ['<rootDir>/test/**/*.spec.js'],
    },
    {
      displayName: 'source code',
      testMatch: ['<rootDir>/src/**/*.spec.js'],
      moduleFileExtensions: [
        'js',
        'json',
        'vue',
      ],
      moduleNameMapper: {
        '\\.(css|less|scss|sass|styl)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
      },
      snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
      testURL: 'http://localhost:8080/'
    },
  ],
};
