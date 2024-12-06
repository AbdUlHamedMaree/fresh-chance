'use server';

import { utapi } from '@/lib/uploadthing';
import { createAsset } from '@/queries/asset';
import { createProduct } from '@/queries/product';
import { createProductAsset } from '@/queries/productAsset';
import {
  insertProductSchema,
  type InsertProduct,
  type SelectAsset,
  type SelectProduct,
  type SelectProductAsset,
} from '@/schema';
import { type ServerActionResult, type ServerActionResultData } from '@/types/server-action-result';

export const createProductAction = async (
  data: InsertProduct & { files?: File[] }
): Promise<ServerActionResult<SelectProduct & { productAssets: ServerActionResultData<CreateProductAssets> }>> => {
  const insetProductArgs = await insertProductSchema.safeParseAsync(data);

  if (!insetProductArgs.success) {
    return {
      success: false,
      error: insetProductArgs.error.message,
    };
  }

  const product = await createProduct(insetProductArgs.data);

  if (!product) {
    return {
      success: false,
      error: 'Failed to create product',
    };
  }

  let productAssets: CreateProductAssets = { success: true, data: [] };

  if (data.files) {
    productAssets = await createProductAssetsAction({ productId: product.id, files: data.files });

    if (!productAssets.success) {
      return productAssets;
    }
  }

  return {
    success: true,
    data: {
      ...product,
      productAssets: productAssets.data,
    },
  };
};

export type CreateProduct = Awaited<ReturnType<typeof createProductAction>>;

export const createProductAssetsAction = async ({
  productId,
  files,
}: {
  productId: string;
  files: File[];
}): Promise<ServerActionResult<(SelectProductAsset & { asset: SelectAsset })[]>> => {
  const uploads = await utapi.uploadFiles(files);

  const data = await Promise.all(
    uploads.map(async upload => {
      if (upload.error) throw upload.error;

      const asset = await createAsset({
        name: upload.data.name,
        url: upload.data.url,
      });

      const productAsset = await createProductAsset({
        productId,
        assetId: asset.id,
      });

      return { ...productAsset, asset };
    })
  );

  return {
    success: true,
    data,
  };
};

export const getProductsActions = async ({
  filters,
}: {
  filters?: {
    ids?: string[];
  };
}): Promise<ServerActionResult<SelectProduct[]>> => {
  const uploads = await utapi.uploadFiles(files);

  const data = await Promise.all(
    uploads.map(async upload => {
      if (upload.error) throw upload.error;

      const asset = await createAsset({
        name: upload.data.name,
        url: upload.data.url,
      });

      const productAsset = await createProductAsset({
        productId,
        assetId: asset.id,
      });

      return { ...productAsset, asset };
    })
  );

  return {
    success: true,
    data,
  };
};

export type CreateProductAssets = Awaited<ReturnType<typeof createProductAssetsAction>>;
