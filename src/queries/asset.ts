'use server';

import { type InsertAsset, assetsTable } from '@/schema/assets';
import { withAuthenticatedDrizzle } from '@/db/authenticated';

export const createAsset = async (data: InsertAsset) =>
  withAuthenticatedDrizzle(async db => (await db.insert(assetsTable).values(data).returning())[0]);
