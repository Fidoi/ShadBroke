import { Banner, FeaturedProducts, MenuSlider, Separator } from '@/components';
import { getDiscountedProducts } from '@/actions';

export default async function Home() {
  const { products } = await getDiscountedProducts({ page: 1 });

  return (
    <div>
      <MenuSlider
        title='ola'
        images={[
          'https://res.cloudinary.com/dzftv7yux/image/upload/v1739399472/sgoqobbgv3qf0vehgpzx.jpg',
          'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?t=st=1739400350~exp=1739403950~hmac=7f52a42574721222f2372a97edc9c29c15ae8bde93aa4918486ec7fdbb741c7d&w=1380',
          'https://images.pexels.com/photos/6068975/pexels-photo-6068975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        ]}
      />
      <Separator className='my-6' />
      <Banner />
      <Separator className='my-6' />
      {products?.length > 0 && <FeaturedProducts products={products} />}
    </div>
  );
}
