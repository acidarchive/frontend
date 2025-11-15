import type { StorybookConfig } from '@storybook/nextjs-vite';

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
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      'process.env.NEXT_PUBLIC_APP_VERSION': JSON.stringify('storybook-version'),
    };
    return config;
  },
};
export default config;
