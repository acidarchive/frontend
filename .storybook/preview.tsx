import '../src/styles/globals.css';

import type { Preview } from '@storybook/nextjs-vite';

import { UserProvider } from '../src/context/user-context';

const preview: Preview = {
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Layouts', 'Pages'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
