'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ width: '100hv', height: '500' }}
        pagination
        navigation={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className='object-fill'
              priority
            />
          </SwiperSlide>
        ))}
        a
      </Swiper>
    </div>
  );
};
