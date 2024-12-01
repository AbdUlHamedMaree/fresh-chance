'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { createProductAction, updateProductAction } from '@/app/dashboard/products/actions';
import { ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { GetProduct } from '@/queries/product';

export const CreateProductForm = ({ initialData, edit }: { initialData: GetProduct | null; edit?: boolean }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingAssets, setExistingAssets] = useState<string[]>(
    initialData?.productAssets?.map(asset => asset.asset.url) || []
  );
  const [, submitAction, isPending] = useActionState<void, FormData>(async (previousState, formData) => {
    formData.delete('files');
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
  }, undefined);

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

  return (
    <form className='space-y-4' action={submitAction}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label htmlFor='title'>Title</label>
          <Input id='title' name='title' placeholder='Enter product title' defaultValue={initialData?.title} />
        </div>
        <div className='space-y-2'>
          <label htmlFor='price'>Price</label>
          <Input id='price' name='price' type='number' placeholder='Enter price' defaultValue={initialData?.price} />
        </div>
        <div className='space-y-2'>
          <label htmlFor='originalPrice'>Original Price</label>
          <Input
            id='originalPrice'
            name='originalPrice'
            type='number'
            placeholder='Enter original price'
            defaultValue={initialData?.originalPrice}
          />
        </div>
        <div className='space-y-2 col-span-2'>
          <label htmlFor='description'>Description</label>
          <Textarea
            id='description'
            name='description'
            placeholder='Enter product description'
            defaultValue={initialData?.description}
          />
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
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Creating...' : edit ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};