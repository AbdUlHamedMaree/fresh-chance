/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercent } from '@/utils/formatPercent';
import { Package } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  imageName?: string;
}

export const ProductCard = ({ id, title, price, originalPrice, imageUrl, imageName }: ProductCardProps) => {
  const discount = (originalPrice - price) / originalPrice;

  return (
    <Link href={`/products/${id}`}>
      <Card className='cursor-pointer'>
        <CardContent className='p-4'>
          {imageUrl ? (
            <img src={imageUrl} alt={imageName || title} width={200} height={200} className='rounded-md object-cover' />
          ) : (
            <div className='w-[200px] h-[200px] bg-gray-100 rounded-md flex items-center justify-center'>
              <Package className='w-8 h-8 text-gray-400' />
            </div>
          )}
          <h3 className='font-semibold mt-2'>{title}</h3>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-500 dark:text-gray-400 line-through'>
              {formatCurrency.format(originalPrice)}
            </p>
            <p className='text-sm font-semibold text-primary'>{formatCurrency.format(price)}</p>
            <span className='text-sm font-medium text-green-600 dark:text-green-500'>
              {formatPercent.format(discount)} off
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
