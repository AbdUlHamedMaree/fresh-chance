import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL in .env.local file');

export const db = drizzle(process.env.DATABASE_URL);
