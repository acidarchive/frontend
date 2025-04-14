import '../src/app/styles/index.scss';
import '../src/app/styles/globals.css';
process.env.NEXT_PUBLIC_APP_VERSION = 'storybook-version';

import type { Preview } from '@storybook/react';
const preview: Preview = {
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
