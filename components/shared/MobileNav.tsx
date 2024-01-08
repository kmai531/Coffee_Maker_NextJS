'use client';
import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
    // SheetClose,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import NavItems from './NavItems';
import { CoffeeLogo } from './CoffeeLogo';
import { Link } from '@nextui-org/react';
import { useState } from 'react';

const MobileNav = () => {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <nav className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="align-middle">
                    <Image
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-3 bg-white md:hidden">
                    <Link color="foreground" href="/">
                        <CoffeeLogo />
                        <p className="font-bold text-inherit text-xl">
                            Coffee Maker
                        </p>
                    </Link>
                    <Separator className="border border-gray-50 mb-2" />
                    <NavItems setOpen={setSheetOpen} />
                </SheetContent>
            </Sheet>
        </nav>
    );
};

export default MobileNav;
