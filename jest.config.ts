import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // preset: 'ts-jest',
  preset: 'ts-jest/presets/default-esm', // for ts-jest ESM
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

export default config;
