import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProduct } from '@/queries/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercent } from '@/utils/formatPercent';
import { Package } from 'lucide-react';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ product_id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product_id } = await params;
  const product = await getProduct(product_id);

  if (!product) {
    notFound();
  }

  const discount = (product.originalPrice - product.price) / product.originalPrice;

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold mb-2'>Title</h3>
              <p>{product.title}</p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Description</h3>
              <p>{product.description}</p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Price</h3>
              <div className='flex items-center gap-2'>
                <p className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                  {formatCurrency.format(product.originalPrice)}
                </p>
                <p className='text-sm font-semibold text-primary'>{formatCurrency.format(product.price)}</p>
                <span className='text-sm font-medium text-green-600 dark:text-green-500'>
                  {formatPercent.format(discount)} off
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {product.productAssets?.map(({ asset }) => (
              <img key={asset.id} src={asset.url} alt={asset.name} className='aspect-square object-cover rounded-md' />
            )) ?? (
              <div className='aspect-square bg-gray-100 rounded-md flex items-center justify-center'>
                <Package className='w-8 h-8 text-gray-400' />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
