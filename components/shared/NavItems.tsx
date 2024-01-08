'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { Link as NextUILink } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavItemsProps = {
    setOpen: (open: boolean) => void;
};

const NavItems = ({ setOpen }: NavItemsProps) => {
    const pathname = usePathname();
    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
            {headerLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
                    <li
                        key={link.route}
                        className={`${
                            isActive && 'text-primary-500'
                        } flex-center p-medium-16 whitespace-nowrap`}
                    >
                        {/* <NextUILink
                            onClick={() => setOpen(false)}
                            color={!isActive ? 'foreground' : 'warning'}
                            href={link.route}
                        > */}
                            {/* {link.label} */}
                            <Link onClick={() => setOpen(false)} href={link.route}>{link.label}</Link>
                        {/* </NextUILink> */}
                    </li>   
                );
            })}
        </ul>
    );
};

export default NavItems;
