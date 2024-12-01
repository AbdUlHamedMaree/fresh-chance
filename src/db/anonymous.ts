import * as schema from '@/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

export const withAnonymousDrizzle = async <T>(callback: (db: NeonHttpDatabase<typeof schema>) => Promise<T>) =>
  callback(drizzle(neon(process.env.DATABASE_ANONYMOUS_URL!), { schema }));
