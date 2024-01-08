'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { coffeeImages } from '@/lib/homepageCarousel';
import 'swiper/css/navigation';
import Link from 'next/link';
import './featuredDrinks.css';
import { Tooltip } from '@nextui-org/react';

const str = "Hellooooooooooooooooooooooooooooooooooooooooooooooooooooo";

const FeaturedDrinks = () => {
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (textRef.current) {
            const isTextTruncated =
                textRef.current.offsetWidth < textRef.current.scrollWidth;
            setIsTruncated(isTextTruncated);
        }
    }, []);
    return (
        <>
            <div>
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // when window width is >= 480px
                        650: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        // when window width is >= 640px
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        // when window width is >= 1024px
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    spaceBetween={50}
                    pagination={{
                        clickable: true,
                    }}
                    // navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {coffeeImages.map((img) => (
                        <SwiperSlide key={img.alt} className=" pb-14">
                            {/* <Card>
                                <CardHeader>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        className="object-cover h-[200px]"
                                        width={250}
                                        height={250}
                                    />
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card> */}
                            {/* <Image
                                
                                src={img.src}
                                alt={img.alt}
                                className="object-cover h-[200px]"
                            /> */}
                            <div className="group relative flex min-h-[250px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white transition-all shadow-md hover:shadow-lg md:min-h-[250px]">
                                <Link
                                    href="#"
                                    style={{
                                        backgroundImage: `url(${img.src})`,
                                    }}
                                    className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
                                >
                                    {/* <Image
                                        src={img.src}
                                        alt={img.alt}
                                        className="object-cover h-[200px]"
                                    /> */}
                                </Link>
                                <div className="flex min-h-[60px] flex-col gap-3 p-5 md:gap-4">
                                    <div className="flex sm:flex-between w-full gap-2 sm:gap-0 sm:flex-row flex-col">
                                        {isTruncated ? (
                                            <Tooltip
                                                content={str}
                                                // className="capitalize"
                                                placement='bottom-start'
                                            >
                                                <p
                                                    ref={textRef}
                                                    className="p-medium-14 md:p-medium-16 text-grey-600 truncate sm:w-3/4"
                                                >
                                                   {str}
                                                </p>
                                            </Tooltip>
                                        ) : (
                                            <p
                                                ref={textRef}
                                                className="p-medium-14 md:p-medium-16 text-grey-600 truncate sm:w-3/4"
                                            >
                                                {str}
                                            </p>
                                        )}
                                        <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                                            $10
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default FeaturedDrinks;
