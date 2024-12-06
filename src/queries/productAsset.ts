'use server';

import { type InsertProductAsset, productAssetsTable, type SelectProductAsset } from '@/schema/productsAssets';
import { withAuthenticatedDrizzle } from '@/db/authenticated';
import { head } from '@/utils/head';

export const createProductAsset = async (data: InsertProductAsset): Promise<SelectProductAsset> =>
  withAuthenticatedDrizzle(async db => db.insert(productAssetsTable).values(data).returning().then(head));
