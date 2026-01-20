'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookiePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('cookieConsent');
        if (!hasAccepted) {
            // Show popup after a small delay
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('cookieConsent', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="container mx-auto max-w-4xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 dark:bg-black/90 dark:border-gray-800">
                        <div className="flex-1 text-center md:text-right">
                            <h3 className="text-lg font-bold text-accent-dark mb-2 dark:text-white">ما از کوکی‌ها استفاده می‌کنیم 🍪</h3>
                            <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                                وب‌سایت شین استور برای بهبود تجربه کاربری و ارائه خدمات بهتر از کوکی‌ها استفاده می‌کند. با ادامه استفاده از سایت، شما با سیاست‌های ما موافقت می‌کنید.
                                <Link href="/privacy" className="text-accent-dark font-medium underline px-1 hover:text-black dark:text-gray-200">
                                    اطلاعات بیشتر
                                </Link>
                            </p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none bg-accent-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg text-sm whitespace-nowrap dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                متوجه شدم
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
