'use client';

import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import useCartStore from '../store/useCartStore';
import Reveal from './Reveal';

export default function ProductCard({ product, index = 0 }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();
    const isLoved = isInWishlist(product._id);

    const toggleLove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoved) {
            removeFromWishlist(product._id);
            toast.error('از علاقه‌مندی‌ها حذف شد');
        } else {
            addToWishlist(product);
            toast.success('به علاقه‌مندی‌ها اضافه شد');
        }
    };

    return (
        <Reveal delay={index * 0.05}>
            <div className="group relative">
                <Link href={`/product/${product._id}`} className="block relative aspect-[4/5] bg-[#F0F0EB] overflow-hidden mb-4">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                        ) : (
                            <span className="font-serif italic text-accent-dark/30 text-2xl">sheen</span>
                        )}
                    </div>

                    {/* Badges */}
                    {index === 1 && (
                        <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest z-10">
                            New In
                        </div>
                    )}

                    {/* Quick Action Overlay (Minimal) */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast.success('به سبد خرید اضافه شد');
                            }}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"
                        >
                            <ShoppingBag size={18} strokeWidth={1.5} />
                        </button>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={toggleLove}
                            className={`drop-shadow-md transition-colors ${isLoved ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-500'}`}
                        >
                            <Heart size={20} strokeWidth={1.5} fill={isLoved ? "currentColor" : "none"} />
                        </button>
                    </div>
                </Link>

                <div className="text-center">
                    <h3 className="text-xs font-bold tracking-widest uppercase mb-1 text-gray-800 group-hover:text-gray-500 transition-colors">
                        <Link href={`/product/${product._id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-xs text-gray-500 font-serif tracking-wide">{product.price} افغانی</p>

                    {/* Color swatches simulation */}
                    <div className="flex justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-2 h-2 rounded-full bg-black border border-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-[#8B4513] border border-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-[#D2B48C] border border-gray-300"></div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
