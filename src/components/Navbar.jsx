'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/useCartStore';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, wishlistItems } = useCartStore();
    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const wishlistCount = wishlistItems ? wishlistItems.length : 0;

    const navLinks = [
        { name: 'همه محصولات', href: '/shop' },
        { name: 'آرایشی و بهداشتی', href: '/shop?cat=beauty' },
        { name: 'پوشاک و لباس', href: '/shop?cat=clothing' },
        { name: 'کیف و کفش', href: '/shop?cat=shoes-bags' },
        { name: 'اکسسوری و زیورآلات', href: '/shop?cat=accessories' },
    ];

    return (
        <div className="w-full font-serif">
            {/* Top Announcement Bar */}
            <div className="bg-accent-red text-white text-center py-2 text-xs md:text-sm font-bold tracking-wider uppercase px-4">
                ارسال رایگان برای خریدهای بالای ۲۵۰۰ افغانی
            </div>

            {/* Main Navigation */}
            <nav className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-50 transition-all">
                <div className="container mx-auto flex justify-between items-center">

                    {/* 1. Mobile Menu Button (Left) */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(true)} className="text-accent-dark hover:text-gray-600 transition">
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* 2. Logo (Centered on mobile, left on desktop) */}
                    <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <Link href="/" className="text-3xl md:text-4xl font-serif text-accent-dark italic tracking-tighter hover:opacity-80 transition">
                            sheen
                        </Link>
                    </div>

                    {/* 3. Desktop Navigation (Centered) */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600 tracking-wide">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group overflow-hidden"
                            >
                                <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">{link.name}</span>
                                <span className="absolute top-full right-0 block w-full group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-accent-dark">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* 4. Icons & Actions */}
                    <div className="flex items-center gap-3 md:gap-5 text-accent-dark">
                        <User size={22} strokeWidth={1.5} className="hidden md:block cursor-pointer hover:text-gray-500 transition-colors" />

                        <Link href="/wishlist" className="relative group p-1 hidden md:block">
                            <Heart size={22} strokeWidth={1.5} className="cursor-pointer hover:text-red-500 transition-colors" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-dark text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" className="relative group p-1">
                            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:text-gray-500 transition-colors" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-accent-cream z-50 p-6 md:hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-2xl font-serif italic text-accent-dark">sheen</span>
                                <button onClick={() => setIsOpen(false)}><X size={24} strokeWidth={1.5} /></button>
                            </div>
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-serif text-accent-dark border-b border-gray-200 pb-2">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
