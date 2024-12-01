import * as schema from '@/schema';
import { auth } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

export const withAuthenticatedDrizzle = async <T>(
  callback: (
    db: NeonHttpDatabase<typeof schema>,
    { userId, authToken }: { userId: string; authToken: string }
  ) => Promise<T>
) => {
  const { getToken, userId } = await auth();
  const authToken = await getToken();
  if (!authToken) {
    throw new Error('No token');
  }

  if (!userId) {
    throw new Error('No userId');
  }

  const db = drizzle(
    neon(process.env.DATABASE_AUTHENTICATED_URL!, {
      authToken: async () => {
        const token = await getToken();
        if (!token) {
          throw new Error('No token');
        }
        return token;
      },
    }),
    { schema }
  );

  return callback(db, { userId, authToken });
};
