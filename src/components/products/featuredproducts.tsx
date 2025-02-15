import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Card, CardFooter } from '../ui/card';
const products = [
  {
    id: 1,
    category: 'Teléfono',
    name: 'iPhone 13 Alta Calidad',
    price: '$999.00',
    rating: 50,
    image:
      'https://res.cloudinary.com/dzftv7yux/image/upload/v1739413923/1693867-00-A_1_luj4wv.webp',
  },
  {
    id: 2,
    category: 'Audio',
    name: 'WH-1000XM4 Auriculares Inalámbricos',
    price: '$59.00',
    oldPrice: '$119.00',
    discount: '20%',
    rating: 120,
    image:
      'https://res.cloudinary.com/dzftv7yux/image/upload/v1739413936/1740409-00-A_0_2000_q0eyfm.webp',
  },
  {
    id: 3,
    category: 'Laptop',
    name: 'S21 Laptop Ultra HD LED',
    price: '$1,199.00',
    discount: '20%',
    rating: 100,
    image:
      'https://res.cloudinary.com/dzftv7yux/image/upload/v1739413949/8529205-00-A_0_2000_vrhtem.webp',
  },
  {
    id: 4,
    category: 'Cámara',
    name: 'Mini Cámara Polaroid con Flash',
    price: '$79.00',
    rating: 70,
    image:
      'https://res.cloudinary.com/dzftv7yux/image/upload/v1739413981/8528833-00-A_2_fipwe7.webp',
  },
  {
    id: 5,
    category: 'Televisión',
    name: 'AG OLED65CXPUA 4K Smart OLED TV',
    price: '$2,799.00',
    rating: 20,
    image:
      'https://res.cloudinary.com/dzftv7yux/image/upload/v1739413988/7654420-00-A_0_2000_aykrji.webp',
  },
];

export const FeaturedProducts = () => {
  return (
    <section className='container mx-auto py-10'>
      <h2 className='mb-6 text-2xl font-bold'>Productos Destacados</h2>
      <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
        {products.map((product) => (
          <Card
            key={product.id}
            className='w-64 flex-shrink-0 rounded-lg border p-4'
          >
            {product.discount && (
              <span className='right-2 top-2 bg-red-500 px-2 py-1 text-xs font-bold text-white rounded-md'>
                {product.discount}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={320}
            />
            <p className='mt-3 text-sm text-gray-500'>{product.category}</p>
            <h3 className='font-semibold'>{product.name}</h3>
            <p className='text-lg font-bold'>{product.price}</p>
            {product.oldPrice && (
              <p className='text-sm text-gray-400 line-through'>
                {product.oldPrice}
              </p>
            )}
            <CardFooter className='mt-3 flex justify-between'>
              <ShoppingCart className='w-6 h-6 cursor-pointer text-primary' />
              <Heart className='w-6 h-6 cursor-pointer text-gray-500' />
              <Share2 className='w-6 h-6 cursor-pointer text-gray-500' />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
