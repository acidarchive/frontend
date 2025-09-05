import { defineConfig } from 'orval';

export default defineConfig({
  zod: {
    input: {
      target: 'http://localhost:8000/api-docs/openapi.json',
    },
    output: {
      mode: 'split',
      client: 'zod',
      target: './src/api/generated',
      fileExtension: '.zod.ts',
    },
  },
});
