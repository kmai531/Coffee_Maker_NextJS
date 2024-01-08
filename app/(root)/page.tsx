import ContactForm from '@/components/shared/ContactForm';
import Contact from '@/components/shared/ContactForm';
import FeaturedDrinks from '@/components/shared/FeaturedDrinks';
import HomepageCarousel from '@/components/shared/HomepageCarousel';
import { SearchParamProps } from '@/types';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

export default async function Home({ searchParams }: SearchParamProps) {
    return (
        <>
            <section className=" bg-slate-100 bg-dotted-pattern bg-contain">
                <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-24">
                    <div className="flex flex-col justify-center gap-8">
                        <h1 className="h1-bold">
                            Sip, Relax: Your Moments, Our Coffee Haven!
                        </h1>
                        <p className="p-regular-20 md:p-regular-24">
                            Discover and savor expert brewing techniques and
                            coffee flavors, guided by our passionate baristas,
                            in our vibrant community of coffee enthusiasts.
                        </p>
                        <Button radius="lg" className="button w-full sm:w-fit">
                            <Link href="#feature-drinks">Explore Now</Link>
                        </Button>
                    </div>
                    <div className="w-full flex items-center">
                        <HomepageCarousel />
                    </div>
                </div>
            </section>
            <section
                id="feature-drinks"
                className="wrapper my-8 flex flex-col gap-8 md:gap-12"
            >
                <h2 className="h2-bold">Featured Drinks</h2>
                <FeaturedDrinks />
            </section>
            <section className=" bg-slate-100 bg-dotted-pattern bg-contain">
                <div className="wrapper ">
                    <div className="flex justify-center pt-12 pb-10 flex-col items-center gap-8">
                        <h2 className="h2-bold text-center">
                            Trust by Thousands of Customers
                        </h2>
                        <Button size="lg" className="w-full sm:w-fit ">
                            Explore Menu
                        </Button>
                    </div>
                </div>
            </section>
            <section className="wrapper ">
                <div className="flex justify-center flex-col items-center py-8">
                    <h2 className="h2-bold text-center">Contact Us</h2>
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
