'use server';

import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/queries/product';
import { insertProductSchema } from '@/schema/products';
import { revalidateTag } from 'next/cache';
import { createAsset } from '@/queries/asset';
import { createProductAsset } from '@/queries/productAsset';
import { utapi } from '@/lib/uploadthing';

export const getAllProductsAction = getAllProducts;

export const createProductAction = async (formData: FormData) => {
  // Create the product first
  const productData = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    originalPrice: formData.get('originalPrice'),
  };

  const product = await createProduct(insertProductSchema.parse(productData));

  // Handle file uploads
  const files = formData.getAll('files') as File[];

  await uploadProductAssetsAction(product!.id, files);

  revalidateTag('products');
};

export const removeProductAction = async (formData: FormData) => {
  await deleteProduct(formData.get('id') + '');

  revalidateTag('products');
};

export const uploadProductAssetsAction = async (productId: string, files: File[]) => {
  for (const file of files) {
    const upload = await utapi.uploadFiles(file);

    if (upload.error) {
      throw upload.error;
    }

    // In a real app, you'd upload to a storage service like S3
    // For this example, we'll just store the file name
    const asset = await createAsset({
      name: upload.data.name,
      url: upload.data.url, // Placeholder URL
    });

    await createProductAsset({
      productId,
      assetId: asset.id,
    });
  }

  revalidateTag('products');
};

export const updateProductAction = async (formData: FormData) => {
  const productId = formData.get('id') + '';
  const productData = insertProductSchema.parse(formData);

  await updateProduct(productId, productData);

  // Handle file uploads if any new files are present
  const files = formData.getAll('files') as File[];
  if (files.length > 0) {
    await uploadProductAssetsAction(productId, files);
  }

  revalidateTag('products');
};
