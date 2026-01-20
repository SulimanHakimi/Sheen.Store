'use client';

import { useState, useEffect } from 'react';
import useCartStore from '../../../../store/useCartStore';
import toast from 'react-hot-toast';
import Navbar from '../../../components/Navbar';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ProductDetailsPage({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetch(`/api/products/${params.id}`)
            .then(res => {
                if (!res.ok) throw new Error('Product not found');
                return res.json();
            })
            .then(data => {
                setProduct(data);
                if (data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                // Handle error or redirect
            });
    }, [params.id]);

    const [qty, setQty] = useState(1);
    const addToCart = useCartStore(state => state.addToCart);

    if (loading) {
        return (
            <main className="flex-grow bg-accent-cream min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="text-xl">در حال بارگذاری...</div>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="flex-grow bg-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="text-xl">محصول یافت نشد</div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-accent-dark">خانه</Link>
                    <ChevronLeft size={16} />
                    <Link href="/shop" className="hover:text-accent-dark">فروشگاه</Link>
                    <ChevronLeft size={16} />
                    <span className="text-accent-dark">{product.name}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Gallery - Left Side */}
                    <div className="space-y-4">
                        {/* Thumbnail Images on Left, Main Image on Right */}
                        <div className="flex gap-4">
                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex flex-col gap-3 w-20">
                                    {product.images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square bg-white rounded cursor-pointer overflow-hidden border-2 transition ${selectedImage === img ? 'border-accent-dark' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="flex-1 aspect-[3/4] bg-white rounded overflow-hidden">
                                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info - Right Side */}
                    <div className="text-right space-y-6">
                        {/* Product Name & Category */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-accent-dark mb-2">{product.name}</h1>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                        </div>

                        {/* Price */}
                        <div className="border-t border-b border-gray-200 py-4">
                            <p className="text-2xl font-bold text-accent-dark">{product.price.toLocaleString()} افغانی</p>
                        </div>

                        {/* Description */}
                        <div className="text-gray-600 leading-relaxed text-sm">
                            {product.description}
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">تعداد:</span>
                                <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="px-4 py-2 hover:bg-gray-100 transition text-lg font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-2 font-medium border-x border-gray-300">{qty}</span>
                                    <button
                                        onClick={() => setQty(q => q + 1)}
                                        className="px-4 py-2 hover:bg-gray-100 transition text-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => {
                                    addToCart(product, qty);
                                    toast.success('به سبد خرید اضافه شد');
                                }}
                                className="w-full bg-accent-dark text-white rounded py-4 font-bold text-sm uppercase tracking-widest hover:bg-black transition"
                            >
                                افزودن به سبد خرید
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-accent-dark">✓</span>
                                <span className="text-gray-600">ارسال رایگان برای خریدهای بالای ۲۵۰۰ افغانی</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-accent-dark">✓</span>
                                <span className="text-gray-600">۷ روز ضمانت بازگشت کالا</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-accent-dark">✓</span>
                                <span className="text-gray-600">تضمین اصالت و کیفیت محصول</span>
                            </div>
                        </div>
                        {/* How to Purchase Section */}
                        {/* How to Purchase Section */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <h3 className="font-serif font-bold text-accent-dark mb-4 text-sm">راهنمای خرید:</h3>
                            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                                <li className="flex gap-3">
                                    <span className="font-bold text-accent-dark min-w-[1.5rem]">۱.</span>
                                    <span>محصول را به سبد خرید اضافه کنید.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-accent-dark min-w-[1.5rem]">۲.</span>
                                    <span>وارد سبد خرید شده و پرداخت را بزنید.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-accent-dark min-w-[1.5rem]">۳.</span>
                                    <span>مشخصات و آدرس خود را وارد کنید.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-accent-dark min-w-[1.5rem]">۴.</span>
                                    <span>روش پرداخت را انتخاب و خرید را نهایی کنید.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
