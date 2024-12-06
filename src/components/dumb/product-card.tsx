/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercent } from '@/utils/formatPercent';
import { Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  imageName?: string;
  onAddToCart?: (id: string) => void;
}

export const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  imageUrl,
  imageName,
  onAddToCart,
}: ProductCardProps) => {
  const discount = (originalPrice - price) / originalPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(id);
  };

  return (
    <Link href={`/products/${id}`}>
      <Card className='cursor-pointer group'>
        <CardContent className='p-4'>
          {imageUrl ? (
            <img src={imageUrl} alt={imageName || title} className='rounded-md object-cover aspect-square' />
          ) : (
            <div className='aspect-square bg-gray-100 rounded-md flex items-center justify-center'>
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
          {onAddToCart && (
            <Button
              className='w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={handleAddToCart}
            >
              <ShoppingCart className='w-4 h-4 mr-2' />
              Add to Cart
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
