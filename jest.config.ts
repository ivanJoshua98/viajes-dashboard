import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).[tj]s'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/app'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // 👈 Esto resuelve los imports con @/
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
