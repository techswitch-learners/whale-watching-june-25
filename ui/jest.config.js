export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.app.json' }],
},
moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/styleMock.js'
  }
};