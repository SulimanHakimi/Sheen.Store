import './globals.css';

import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

import CookiePopup from '../components/CookiePopup';

export const metadata = {
    metadataBase: new URL('https://sheenstore.com'),
    title: {
        default: 'Sheen Store | فروشگاه پوشاک و اکسسوری بانوان',
        template: '%s | فروشگاه شین'
    },
    description: 'فروشگاه شین، ارائه‌دهنده جدیدترین و باکیفیت‌ترین پوشاک، شال، روسری و اکسسوری‌های بانوان با طراحی‌های مدرن و اصیل. زیبایی و وقار را با ما تجربه کنید.',
    keywords: ['پوشاک بانوان', 'شال', 'روسری', 'مانتو', 'لباس زنانه', 'اکسسوری', 'خرید آنلاین', 'فروشگاه شین'],
    authors: [{ name: 'Sheen Team' }],
    creator: 'Sheen',
    openGraph: {
        type: 'website',
        locale: 'fa_IR',
        url: 'https://sheenstore.com',
        title: 'Sheen Store | دنیای زیبایی و وقار',
        description: 'جدیدترین کالکشن‌های پوشاک و اکسسوری بانوان در فروشگاه اینترنتی شین.',
        siteName: 'Sheen Store',
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/icon.png',
        apple: '/icon.png',
    },
    manifest: '/site.webmanifest',
};

import NextAuthProvider from '../components/NextAuthProvider';

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
            <body className="min-h-screen flex flex-col">
                <NextAuthProvider>
                    <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontFamily: 'Vazirmatn, Tahoma, Arial, sans-serif' } }} />
                    {children}
                    <CookiePopup />
                    <Footer />
                </NextAuthProvider>
            </body>
        </html>
    );
}
