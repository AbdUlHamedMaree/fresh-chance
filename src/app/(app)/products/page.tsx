import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/smart/product-card';
import { getAllProductsAction } from '@/app/dashboard/products/actions';

export default async function ProductsPage() {
  const products = await getAllProductsAction();

  return (
    <div className='container py-8'>
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                imageUrl={product.productAssets?.[0]?.asset.url}
                imageName={product.productAssets?.[0]?.asset.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
