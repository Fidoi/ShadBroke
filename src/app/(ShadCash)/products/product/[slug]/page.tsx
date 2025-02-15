export const revalidate = 604000;
import { getProductBySlug } from '@/actions';
import {
  AddToCart,
  BreadcrumbWithCustomSeparator,
  Button,
  Card,
  InfoAccordion,
  ProductSlideshow,
  StockLabel,
} from '@/components';
import { Review } from '@/components/products/product/review/Review';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
  //params: { slug: string };
}
export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className='mx-4'>
        <div className='max-w-6xl mx-auto p-6 '>
          <BreadcrumbWithCustomSeparator
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Productos', href: '/products' },
              { label: product.gender, href: `/gender/${product.gender}` },
              { label: product.title },
            ]}
          />
        </div>
        <div className='max-w-6xl mx-auto pb-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card>
            <ProductSlideshow
              title={product.title}
              images={product.images}
              className='w-full'
            />
          </Card>

          <div className='flex flex-col justify-start'>
            <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
            <p className='text-xl font-semibold text-gray-700 mb-4'>
              ${product.price}
            </p>
            <StockLabel slug={product.slug} />

            <p className='text-base text-gray-900 mb-6'>
              El polerón Shadbroke combina suavidad, abrigo y un diseño
              versátil. Confeccionado en algodón y poliéster, cuenta con
              interior afelpado, capucha ajustable y bolsillo canguro. Ideal
              para cualquier ocasión, te mantiene cómodo y con estilo.
            </p>
            <AddToCart product={product} />

            <div className='space-y-2'>
              <InfoAccordion />
            </div>
          </div>
        </div>
      </div>
      <Review />
    </>
  );
}
