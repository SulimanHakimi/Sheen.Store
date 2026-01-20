'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setEmail('');
            } else {
                toast.error(data.error || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-accent-cream text-accent-dark pt-20 pb-12 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-4xl font-serif italic font-bold mb-6 block tracking-tighter">
                            sheen
                        </Link>
                        <p className="text-gray-500 font-serif text-sm leading-7 mb-6 max-w-xs">
                            زیبایی، وقار و اصالت در پوشش بانوی امروزی. با فروشگاه شین، استایل خود را تکمیل کنید.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/hijab.sheen" className="text-gray-400 hover:text-accent-dark transition-colors"><FaInstagram size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors"><FaTelegram size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors"><FaWhatsapp size={18} /></a>
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 w-fit">خرید</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-serif">
                            <li><Link href="/shop" className="hover:text-accent-dark transition">جدیدترین‌ها</Link></li>
                            <li><Link href="/shop?cat=beauty" className="hover:text-accent-dark transition">آرایشی و بهداشتی</Link></li>
                            <li><Link href="/shop?cat=clothing" className="hover:text-accent-dark transition">پوشاک و لباس</Link></li>
                            <li><Link href="/shop?cat=shoes-bags" className="hover:text-accent-dark transition">کیف و کفش</Link></li>
                            <li><Link href="/shop?cat=accessories" className="hover:text-accent-dark transition">اکسسوری و زیورآلات</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 w-fit">راهنما</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-serif">
                            <li><Link href="/about" className="hover:text-accent-dark transition">درباره ما</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-dark transition">تماس با ما</Link></li>
                            <li><Link href="/shipping" className="hover:text-accent-dark transition">ارسال و بازگشت</Link></li>
                            <li><Link href="/faq" className="hover:text-accent-dark transition">سوالات متداول</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 w-fit">خبرنامه</h3>
                        <p className="text-gray-500 text-sm mb-4 font-serif">برای دریافت آخرین اخبار و پیشنهادات ویژه عضو شوید.</p>
                        <form onSubmit={handleSubmit} className="flex border-b border-gray-400 pb-1">
                            <input
                                type="email"
                                placeholder="ایمیل شما"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm placeholder-gray-400 text-accent-dark font-serif"
                                required
                            />
                            <button type="submit" disabled={loading} className="text-xs font-bold uppercase hover:text-gray-500 disabled:opacity-50">
                                {loading ? '...' : 'ارسال'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
                    <p>&copy; {new Date().getFullYear()} Sheen. ALL RIGHTS RESERVED</p>
                    <div className="flex gap-4 mt-4 md:mt-0 font-bold">
                        <Link href="/privacy" className="hover:text-accent-dark transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent-dark transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
