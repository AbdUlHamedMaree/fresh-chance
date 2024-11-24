import '$/lib/env';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL in .env.local file');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './database/migrations',

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
