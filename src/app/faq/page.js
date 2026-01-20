'use client';

import Navbar from '../../components/Navbar';
import Reveal from '../../components/Reveal';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            question: 'چگونه می‌توانم سفارش خود را پیگیری کنم؟',
            answer: 'پس از ارسال سفارش، یک کد پیگیری برای شما پیامک خواهد شد. همچنین می‌توانید با وارد شدن به حساب کاربری خود بخش "سفارش‌های من" وضعیت سفارش را مشاهده کنید.'
        },
        {
            question: 'آیا امکان پرداخت در محل وجود دارد؟',
            answer: 'بله، برای مشتریان ساکن شهر کابل امکان پرداخت وجه هنگام تحویل کالا وجود دارد. برای سایر ولایات، پرداخت باید به صورت آنلاین یا کارت به کارت انجام شود.'
        },
        {
            question: 'هزینه ارسال چقدر است؟',
            answer: 'هزینه ارسال برای سفارشات بالای ۲۵۰۰ افغانی رایگان است. برای سفارشات کمتر، ۱۵۰ افغانی در کابل و ۲۵۰ افغانی برای سایر ولایات هزینه ثابت در نظر گرفته شده است.'
        },
        {
            question: 'آیا می‌توانم سفارشم را کنسل کنم؟',
            answer: 'تا زمانی که سفارش شما بسته‌بندی و ارسال نشده باشد (معمولاً تا ۲ ساعت پس از ثبت سفارش)، می‌توانید با تماس با پشتیبانی سفارش خود را لغو کنید.'
        },
        {
            question: 'چه مدت طول می‌کشد تا سفارش به دستم برسد؟',
            answer: 'سفارشات کابل معمولاً بین ۱ تا ۲ روز کاری و سفارشات ولایات بین ۳ تا ۵ روز کاری تحویل داده می‌شوند.'
        },
        {
            question: 'جنس پارچه‌ها چیست و چگونه باید شسته شوند؟',
            answer: 'در صفحه جزئیات هر محصول، جنس دقیق پارچه و دستورالعمل شستشو ذکر شده است. به طور کلی توصیه می‌کنیم شال‌ها و روسری‌های ظریف را با دست و آب سرد بشویید.'
        }
    ];

    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <Reveal>
                    <h1 className="text-3xl md:text-4xl font-bold text-accent-dark mb-4 font-serif text-center">سوالات متداول</h1>
                    <p className="text-center text-gray-500 mb-12">پاسخ به پرسش‌های رایج شما</p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </main>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-primary-50/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-right focus:outline-none hover:bg-primary-50 transition-colors"
            >
                <span className="font-bold text-accent-dark text-lg font-serif">{question}</span>
                <span className="text-accent-dark ml-2">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 pt-0 text-gray-600 leading-7 border-t border-gray-100 mt-2">
                    {answer}
                </div>
            </div>
        </div>
    );
}
