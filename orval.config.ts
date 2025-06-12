import { defineConfig } from 'orval';

export default defineConfig({
  tb303api: {
    input: {
      target: 'http://localhost:8000/api-docs/openapi.json',
    },
    output: {
      mode: 'split',
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        enumGenerationType: 'enum',
      },
    },
  },
});
