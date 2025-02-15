'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Props {
  images: string[];
  title?: string;
  className?: string;
}

export const MenuSlider = ({ images, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='flex justify-center items-center'>
            {/* Contenedor con altura explícita y posición relativa */}
            <div className='relative w-full h-[70vh] max-h-[800px]'>
              <Image
                src={image}
                alt={`Image ${index}`}
                className='object-cover'
                fill
              />
            </div>
          </SwiperSlide>
        ))}

        <div className='swiper-button-next !text-primary-500 hover:!text-primary-700' />
        <div className='swiper-button-prev !text-primary-500 hover:!text-primary-700' />
      </Swiper>
    </div>
  );
};
