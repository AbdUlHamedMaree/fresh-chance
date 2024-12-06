/* eslint-disable @next/next/no-img-element */
import { CreateProductForm } from '@/components/smart/create-product-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { removeProductAction } from './actions';
import Link from 'next/link';
import { getProducts } from '@/queries/product';

export default async function Home({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const products = await getProducts();
  const productIdToEdit = (await searchParams).edit;
  const productToEdit = products.find(product => product.id === productIdToEdit);

  return (
    <div className='min-h-screen p-8 space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>{productToEdit ? 'Edit Product' : 'Create New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProductForm initialData={productToEdit} edit={!!productToEdit} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.originalPrice}</TableCell>
                  <TableCell>
                    {product.productAssets?.map(({ asset }) => (
                      <img
                        key={asset.id}
                        src={asset.url}
                        alt={asset.name}
                        className='w-10 h-10 object-cover rounded-md mt-2'
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Link href={`?edit=${product.id}`}>
                        <Button variant='secondary' size='sm'>
                          Edit
                        </Button>
                      </Link>
                      <form action={removeProductAction}>
                        <input type='hidden' name='id' value={product.id} />
                        <Button variant='destructive' size='sm'>
                          Delete
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
