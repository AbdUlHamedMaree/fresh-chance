'use client';

import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { uploadProductAssetsAction } from '@/app/dashboard/products/actions';

interface UploadProductAssetsFormProps {
  productId: string;
}

export const UploadProductAssetsForm = ({ productId }: UploadProductAssetsFormProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;
    setIsPending(true);
    try {
      await uploadProductAssetsAction(productId, selectedFiles);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsPending(false);
    }
  };

  const onUpload = () => {
    ref.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='flex flex-col gap-4'>
        <div>
          <input
            ref={ref}
            type='file'
            multiple
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
            disabled={isPending}
          />
          <Button type='button' variant='outline' size='sm' onClick={onUpload} disabled={isPending}>
            <ImageIcon className='h-4 w-4 mr-2' />
            {isPending ? 'Uploading...' : 'Upload Images'}
          </Button>
        </div>

        {selectedFiles.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {selectedFiles.map((file, index) => (
              <div key={index} className='relative group'>
                <img src={URL.createObjectURL(file)} alt={file.name} className='w-20 h-20 object-cover rounded-md' />
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  className='absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                  disabled={isPending}
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            ))}
            <Button type='submit' disabled={isPending || selectedFiles.length === 0}>
              {isPending ? 'Saving...' : 'Save Images'}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
