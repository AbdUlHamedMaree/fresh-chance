import '$/lib/env';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '$/schema';

if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL in .env.local file');

export const db = drizzle(process.env.DATABASE_URL, { schema });
