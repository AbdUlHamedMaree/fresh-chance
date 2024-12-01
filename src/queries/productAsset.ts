'use server';

import { type InsertProductAsset, productAssetsTable } from '@/schema/productsAssets';
import { withAuthenticatedDrizzle } from '@/db/authenticated';

export const createProductAsset = async (data: InsertProductAsset): Promise<void> => {
  await withAuthenticatedDrizzle(async db => db.insert(productAssetsTable).values(data));
};
