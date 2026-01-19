
import Navbar from '../../components/Navbar';
import Reveal from '../../components/Reveal';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { Star } from 'lucide-react';
import connectDB from '../../lib/db';
import Product from '../../lib/models/Product';

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getFeaturedProducts() {
    await connectDB();
    const products = await Product.find({ isFeatured: true }).limit(8).lean();
    return products.map(product => ({
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString()
    }));
}

export default async function Home() {
    const featuredProducts = await getFeaturedProducts();

    const reviews = [
        {
            id: 1,
            name: 'فاطمه احمدی',
            rating: 5,
            text: 'کیفیت محصولات عالی است! شال‌های ابریشمی خیلی نرم و زیبا هستند.',
            product: 'شال ابریشمی مجلسی'
        },
        {
            id: 2,
            name: 'مریم رحیمی',
            rating: 5,
            text: 'خدمات و ارسال سریع، محصولات دقیقاً مطابق تصویر. بسیار راضی هستم.',
            product: 'عبای لوکس گلدوزی شده'
        },
        {
            id: 3,
            name: 'زهرا کریمی',
            rating: 5,
            text: 'قیمت‌ها مناسب و کیفیت بسیار بالا. حتماً دوباره خرید می‌کنم.',
            product: 'روسری گلدار نیلی'
        },
        {
            id: 4,
            name: 'سمیرا حسینی',
            rating: 5,
            text: 'تنوع رنگ‌ها و مدل‌ها فوق‌العاده است. پیدا کردن حجاب مناسب خیلی آسان شد.',
            product: 'شال حریر کرم رنگ'
        }
    ];

    return (
        <main className="flex-grow bg-white min-h-screen text-accent-dark">
            <Navbar />

            {/* Minimalist Hero Section with Subtitle */}
            <section className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg-2.jpg')" }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                    <Reveal>
                        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase text-white drop-shadow-md">
                            کالکشن زمستانه
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-serif text-white font-medium mb-4 drop-shadow-md italic">
                            زیبایی در سادگی
                        </h1>
                        <p className="text-white/90 text-sm md:text-base mb-8 max-w-xl drop-shadow-md">
                            پوشاک و اکسسوری‌های باکیفیت و شیک برای بانوان، با بهترین پارچه‌ها و طراحی‌های منحصر به فرد
                        </p>
                        <Link href="/shop" className="bg-white text-accent-dark px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-accent-dark hover:text-white transition-all duration-300">
                            مشاهده فروشگاه
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Introduction Text */}
            <section className="py-24 px-4 text-center max-w-4xl mx-auto">
                <Reveal>
                    <h3 className="text-2xl md:text-3xl font-serif text-accent-dark mb-6 tracking-wide uppercase">
                        دنیای شین
                    </h3>
                    <p className="text-accent-dark/80 leading-8 font-serif text-sm md:text-base">
                        فروشگاه شین با ارائه طیف وسیعی از پوشاک، شال و روسری و اکسسوری‌های باکیفیت، برای هر سلیقه‌ای پاسخی دارد. از استایل‌های کلاسیک و رسمی گرفته تا مدل‌های اسپرت و روزمره، کالکشن‌های ما برای تکمیل استایل شما طراحی شده است...
                    </p>
                    <div className="mt-8">
                        <Link href="/about" className="border-b border-accent-dark text-xs font-bold uppercase tracking-widest pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                            بیشتر بخوانید
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-4 pb-20">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-serif text-accent-dark mb-2">محصولات ویژه</h3>
                    <p className="text-gray-500 text-sm">جدیدترین و محبوب‌ترین محصولات ما</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product, idx) => (
                            <ProductCard key={product._id} product={product} index={idx} />
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">محصولی یافت نشد</p>
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link href="/shop" className="border border-accent-dark text-accent-dark px-10 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent-dark hover:text-white transition-all duration-300 inline-block">
                        مشاهده همه محصولات
                    </Link>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="bg-white py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Reveal>
                        <div className="text-center mb-12">
                            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">نظرات مشتریان</h3>
                            <p className="text-gray-500 text-sm">آنچه مشتریان ما می‌گویند</p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviews.map((review, idx) => (
                            <Reveal key={review.id} delay={idx * 0.1}>
                                <div className="bg-accent-cream p-6 rounded-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-accent-red text-accent-red" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                        &quot;{review.text}&quot;
                                    </p>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="font-bold text-sm text-accent-dark">{review.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{review.product}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Large Promo Banner */}
            <section className="grid md:grid-cols-2 h-[600px]">
                <div className="bg-[#EAE8E4] flex flex-col justify-center items-center p-12 text-center">
                    <h3 className="text-4xl font-serif italic mb-4">عبای‌های لوکس</h3>
                    <p className="text-gray-600 mb-8 max-w-sm text-sm leading-7">
                        طراحی شده برای راحتی و زیبایی، با بهترین کیفیت دوخت و پارچه برای استایل روزمره شما.
                    </p>
                    <Link href="/shop?category=عبایا" className="border-b border-black text-xs font-bold uppercase tracking-widest pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                        خرید کنید
                    </Link>
                </div>
                <div className="bg-gray-200 h-full">
                    <img src="/images/dress-promo.png" alt="Luxury Abaya" className="w-full h-full object-cover" />
                </div>
            </section>
        </main>
    );
}
