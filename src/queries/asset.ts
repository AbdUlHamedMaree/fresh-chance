'use server';

import { type InsertAsset, assetsTable } from '@/schema/assets';
import { withAuthenticatedDrizzle } from '@/db/authenticated';
import { head } from '@/utils/head';

export const createAsset = async (data: InsertAsset) =>
  withAuthenticatedDrizzle(async db => await db.insert(assetsTable).values(data).returning().then(head));
