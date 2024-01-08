'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { images } from '@/lib/homepageCarousel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const HomepageCarousel = () => {
    const pagination = {
        clickable: true,
    }
    return (
        <Swiper
            pagination={pagination}
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            autoplay={{
                delay: 3000, 
                disableOnInteraction: false,
            }}
            className='rounded-lg'
        >
            {images.map((image) => (
                <SwiperSlide key={image.alt} className='rounded-lg'>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        className="block h-[30rem] w-full object-cover rounded-lg"
                    />
                </SwiperSlide>
            ))}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
    );
};

export default HomepageCarousel;
