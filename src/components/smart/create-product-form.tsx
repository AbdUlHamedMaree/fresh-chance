'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProductAction, updateProductAction } from '@/app/dashboard/products/actions';
import { ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { GetProduct } from '@/queries/product';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Add form schema
const productSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  price: z.coerce.number().min(0, 'Price must be greater than 0'),
  originalPrice: z.coerce.number().min(0, 'Original price must be greater than 0'),
  description: z.string().trim().min(1, 'Description is required'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export const CreateProductForm = ({ initialData, edit }: { initialData: GetProduct | null; edit?: boolean }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingAssets, setExistingAssets] = useState<string[]>(
    initialData?.productAssets?.map(asset => asset.asset.url) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      price: initialData?.price || 0,
      originalPrice: initialData?.originalPrice || 0,
      description: initialData?.description || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const onUpload = () => {
    ref.current?.click();
  };

  const removeExistingAsset = (assetUrl: string) => {
    setExistingAssets(assets => assets.filter(asset => asset !== assetUrl));
  };

  const onSubmit = handleSubmit(async data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    if (edit && initialData?.id) {
      formData.append('id', initialData.id);
      await updateProductAction(formData);
    } else {
      await createProductAction(formData);
    }

    setSelectedFiles([]);
  });

  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label htmlFor='title'>Title</label>
          <Input id='title' {...register('title')} placeholder='Enter product title' />
          {errors.title && <p className='text-sm text-destructive'>{errors.title.message}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='price'>Price</label>
          <Input id='price' type='number' {...register('price')} placeholder='Enter price' min={0} />
          {errors.price && <p className='text-sm text-destructive'>{errors.price.message}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='originalPrice'>Original Price</label>
          <Input
            id='originalPrice'
            type='number'
            {...register('originalPrice')}
            placeholder='Enter original price'
            min={0}
          />
          {errors.originalPrice && <p className='text-sm text-destructive'>{errors.originalPrice.message}</p>}
        </div>

        <div className='space-y-2 col-span-2'>
          <label htmlFor='description'>Description</label>
          <Textarea id='description' {...register('description')} placeholder='Enter product description' />
          {errors.description && <p className='text-sm text-destructive'>{errors.description.message}</p>}
        </div>

        <div className='space-y-2 col-span-2'>
          <label htmlFor='files'>Product Images</label>
          <div className='flex flex-col gap-4'>
            <div>
              <input
                ref={ref}
                type='file'
                id='files'
                name='files'
                multiple
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />
              <Button type='button' variant='outline' onClick={onUpload}>
                <ImageIcon className='h-4 w-4 mr-2' />
                Select Images
              </Button>
            </div>

            {existingAssets.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {existingAssets.map((imageUrl, index) => (
                  <div key={`existing-${index}`} className='relative group'>
                    <img
                      src={imageUrl}
                      alt={`Product image ${index + 1}`}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <button
                      type='button'
                      onClick={() => removeExistingAsset(imageUrl)}
                      className='absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedFiles.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {selectedFiles.map((file, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <button
                      type='button'
                      onClick={() => removeFile(index)}
                      className='absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : edit ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};
