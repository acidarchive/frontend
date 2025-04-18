'use client';

import { Amplify } from 'aws-amplify';

import { authConfig } from '@/app/utils/auth-config';

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true },
);

export default function ConfigureAmplifyClientSide() {
  // eslint-disable-next-line unicorn/no-null
  return null;
}
