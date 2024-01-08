"use client"
import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link as NextUILink,
    Button,
} from '@nextui-org/react';
import Link from 'next/link';
import { CoffeeLogo } from './CoffeeLogo';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import MobileNav from './MobileNav';
import { Separator } from '../ui/separator';
import { headerLinks } from '@/constants';
import { usePathname } from 'next/navigation';

export default function NextUIHeader() {
    const pathname = usePathname();
    return (
        <header className="pt-2">
            <Navbar maxWidth="full">
                <NavbarBrand>
                    {/* <NextUILink href='/' color="foreground"> */}
                        {/* <Link href="/" className='flex'> */}
                            <CoffeeLogo />
                            <p className="font-bold text-inherit text-xl">
                                Coffee Maker
                            </p>
                        {/* </Link> */}
                    {/* </NextUILink> */}
                </NavbarBrand>
                <SignedIn>
                    <NavbarContent
                        className="hidden md:flex gap-4 "
                        justify="center"
                    >
                        {headerLinks.map((link) => {
                            const isActive = pathname === link.route;
                            return (
                                <NavbarItem isActive={isActive} key={link.route}>
                                    {/* <NextUILink href={link.route} color={!isActive ? 'foreground' : 'warning'}> */}
                                        <Link href={link.route}>{link.label}</Link>
                                        {/* {link.label} */}
                                    {/* </NextUILink> */}
                                </NavbarItem>
                            )
                        })}
                        {/* <NavbarItem>
                            <Link color="foreground" href="#">
                                Features
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link href="#" aria-current="page">
                                Customers
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Integrations
                            </Link>
                        </NavbarItem> */}
                    </NavbarContent>
                </SignedIn>

                <NavbarContent justify="end">
                    {/* <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem> */}
                    <SignedIn>
                        <NavbarItem>
                            <UserButton afterSignOutUrl="/" />
                        </NavbarItem>
                        <NavbarItem>
                            <MobileNav />
                        </NavbarItem>
                    </SignedIn>
                    <SignedOut>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="/sign-in"
                                variant="flat"
                            >
                                Login
                            </Button>
                        </NavbarItem>
                    </SignedOut>
                </NavbarContent>
            </Navbar>
            <Separator className="border border-gray-50" />
        </header>
    );
}
