import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import NextUIHeader from '@/components/shared/NextUIHeader';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            {/* <Header /> */}
            <NextUIHeader />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
        </div>
    );
}
