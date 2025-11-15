import { setProjectAnnotations } from '@storybook/nextjs-vite';
import { vi } from 'vitest';

import * as projectAnnotations from './preview';

vi.mock('aws-amplify/auth', () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  resendSignUpCode: vi.fn(),
  fetchAuthSession: vi.fn().mockResolvedValue({ tokens: null }),
  fetchUserAttributes: vi.fn().mockResolvedValue({}),
  getCurrentUser: vi.fn(),
}));

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations]);
