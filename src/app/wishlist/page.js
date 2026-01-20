'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import useCartStore from '../../../store/useCartStore';
import { ShoppingBag, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist, addToCart } = useCartStore();

    const moveAllToCart = () => {
        wishlistItems.forEach(item => addToCart(item));
        toast.success('همه موارد به سبد خرید اضافه شدند');
    };

    return (
        <main className="flex-grow bg-white min-h-screen text-accent-dark">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-accent-dark mb-8 border-b pb-4">علاقه‌مندی‌ها</h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mb-6 inline-block p-6 bg-gray-50 rounded-full text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 font-serif text-gray-600">لیست علاقه‌مندی‌های شما خالی است</h2>
                        <Link href="/shop" className="text-accent-dark border-b border-accent-dark hover:text-gray-600 hover:border-gray-600 transition pb-1 font-medium">مشاهده محصولات</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistItems.map((item) => (
                                <div key={item._id} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition">
                                    <Link href={`/product/${item._id}`} className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                        {item.images?.[0] ? (
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromWishlist(item._id);
                                                toast.success('از علاقه‌مندی‌ها حذف شد');
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition"
                                        >
                                            <X size={16} />
                                        </button>
                                    </Link>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-bold text-accent-dark mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{item.price.toLocaleString()} افغانی</p>
                                        <button
                                            onClick={() => {
                                                addToCart(item);
                                                toast.success('به سبد خرید اضافه شد');
                                            }}
                                            className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-accent-dark hover:text-white text-accent-dark py-3 rounded-lg transition text-sm font-bold"
                                        >
                                            <ShoppingBag size={16} />
                                            افزودن به سبد
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <button onClick={moveAllToCart} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md">
                                افزودن همه به سبد خرید
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
