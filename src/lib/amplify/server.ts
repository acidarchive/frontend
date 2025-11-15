import { Amplify } from 'aws-amplify';

import { authConfig } from './config';

Amplify.configure({ Auth: authConfig }, { ssr: true });
