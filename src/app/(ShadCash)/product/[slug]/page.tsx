export const revalidate = 604000;
import { getProductBySlug, isProductFavorited } from '@/actions';
import { auth } from '@/auth.config';
import {
  AddToCart,
  BreadcrumbWithCustomSeparator,
  Button,
  Card,
  DiscountBadge,
  FavoriteButton,
  InfoAccordion,
  ProductSlideshow,
  Review,
  ShareModal,
  StockLabel,
} from '@/components';
import { Badge } from '@/components/ui/badge';
import { currencyFormat, genderTranslations } from '@/utils';
import { Pencil } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const session = await auth();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  const initialFavorited = session?.user
    ? await isProductFavorited(product.id)
    : false;

  return (
    <>
      <div className='mx-4'>
        <div className='flex max-w-6xl mx-auto p-6 justify-between'>
          <BreadcrumbWithCustomSeparator
            items={[
              { label: 'Productos', href: '/products' },
              {
                label: genderTranslations[product.gender],
                href: `/gender/${product.gender}`,
              },
              { label: product.title },
            ]}
          />
          {(session?.user.role === 'admin' ||
            session?.user.role === 'supervisor') && (
            <Link href={`/profile/admin/products/${product.slug}`}>
              <Button variant='outline'>
                <Pencil />
                Editar Producto
              </Button>
            </Link>
          )}
        </div>
        <div className='max-w-6xl mx-auto pb-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card className='w-full flex items-center justify-center overflow-hidden'>
            <ProductSlideshow
              title={product.title}
              images={product.images}
              className='w-full'
            />
          </Card>

          <div className='flex flex-col justify-start'>
            <div className='flex justify-between'>
              <div className='col-span-1'>
                <h1 className='text-3xl font-bold mb-2 text-primary'>
                  {product.title}
                </h1>
                {Number(product.inStock) > 0 ? (
                  <StockLabel slug={product.slug} />
                ) : (
                  <Badge variant='destructive' className='text-sm px-4 py-2'>
                    Stock: Agotado
                  </Badge>
                )}
              </div>

              <div className='flex gap-x-2'>
                <FavoriteButton
                  productId={product.id}
                  initialFavorited={initialFavorited}
                />

                <ShareModal
                  title={product.title}
                  description={product.description}
                  imageUrl={product.images[0]}
                  price={
                    product.discount && product.discount > 0
                      ? product.price * (1 - product.discount / 100)
                      : product.price
                  }
                />
              </div>
            </div>
            {Number(product.inStock) > 0 && (
              <>
                {product.discount && product.discount > 0 ? (
                  <>
                    <div className='flex gap-x-3 '>
                      <span className='text-sm line-through text-gray-500'>
                        {currencyFormat(product.price)}
                      </span>
                      <DiscountBadge discount={product.discount} text='% off' />
                    </div>
                    <p className='text-xl font-semibold text-gray-700 '>
                      {currencyFormat(
                        product.price * (1 - product.discount / 100)
                      )}
                    </p>
                  </>
                ) : (
                  <p className='text-xl font-semibold text-gray-700 '>
                    {currencyFormat(product.price)}
                  </p>
                )}
              </>
            )}

            <p className='text-base text-gray-900 mb-6 mt-3'>
              {product.description}
            </p>
            <AddToCart product={product} />

            <div className='space-y-2'>
              <InfoAccordion />
            </div>
          </div>
        </div>
      </div>
      <Review productId={product.id} />
    </>
  );
}
