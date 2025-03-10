'use client';

import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={`flex flex-row gap-1 ${className}`}>
      <div className='hidden md:block'>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction='vertical'
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper w-[100px] h-[500px]'
        >
          {images.map((image) => (
            <SwiperSlide key={image} className='!h-[120px] mb-2'>
              <ProductImage
                width={100}
                height={120}
                src={image}
                alt={title}
                className='rounded-lg object-contain cursor-pointer border'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 10000 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='flex-1 w-full '
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={500}
              height={750}
              src={image}
              alt={title}
              className='w-full h-full object-cover rounded-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
