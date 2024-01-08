import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Header = () => {
    return (
        <header className="w-full border-b py">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="w-44">
                    <div className="flex w-full items-center gap-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                        >
                            <path d="M18.5 5l-1.224-2.447A1 1 0 0016.382 2H7.618a1 1 0 00-.894.553L5.5 5H3v2h18V5h-2.5zM6.734 21.142c.071.492.493.858.991.858h8.551a1 1 0 00.99-.858L19 9H5l1.734 12.142zM16 12l-.714 5H8.714L8 12h8z" />
                        </svg>
                        <span className="font-bold text-xl">Coffee Maker</span>
                    </div>
                </Link>

                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        {/* <NavItems /> */}
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav />
                    </SignedIn>
                    <SignedOut>
                        <Button className="rounded-full" size="lg">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
};

export default Header;
