import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/nextjs-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [],
  viteFinal: viteConfig => {
    viteConfig.define = {
      ...viteConfig.define,
      'process.env.NEXT_PUBLIC_APP_VERSION': JSON.stringify('storybook-version'),
    };

    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        'aws-amplify/auth': path.resolve(__dirname, 'mocks/aws-amplify-auth.ts'),
        ...viteConfig.resolve?.alias,
      },
    };

    return viteConfig;
  },
};
export default config;
