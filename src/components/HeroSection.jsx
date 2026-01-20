'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <div className="relative h-[600px] w-full bg-gradient-to-r from-primary-50 to-cream overflow-hidden flex items-center">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-full h-full opacity-30">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-200 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <span className="text-primary-600 font-bold tracking-wider text-sm mb-2 block">
                        کالکشن جدید ۲۰۲۴
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight font-serif">
                        زیبایی در <span className="text-primary-600">سادگی</span> است
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-lg leading-loose">
                        با مجموعه جدید حجاب‌های شین، وقار و زیبایی را تجربه کنید. طراحی شده برای بانوان با سلیقه.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl">
                            خرید کنید
                        </button>
                        <button className="bg-white text-primary-600 border border-primary-200 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition">
                            مشاهده کلکسیون
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[500px] hidden md:block"
                >
                    {/* Placeholder for Hero Image */}
                    <div className="w-full h-full rounded-tl-[100px] rounded-br-[100px] shadow-2xl overflow-hidden relative">
                        <img src="/images/hero.png" alt="Stylish Hijab Model" className="w-full h-full object-cover" />
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 border-4 border-gold-300 rounded-full z-[-1]"></div>
                </motion.div>
            </div>
        </div>
    );
}
