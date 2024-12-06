'use server';

import { type InsertAsset, type SelectAsset } from '@/schema/assets';
import { createAsset } from '@/queries/asset';

export const createAssetAction = async (data: InsertAsset): Promise<SelectAsset> => {
  const asset = await createAsset(data);

  return asset;
};
