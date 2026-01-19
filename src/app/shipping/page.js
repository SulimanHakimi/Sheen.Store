'use client';

import Navbar from '../../../components/Navbar';
import Reveal from '../../../components/Reveal';
import { Truck, RotateCcw, Clock } from 'lucide-react';

export default function Shipping() {
    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Reveal>
                    <h1 className="text-3xl md:text-4xl font-bold text-accent-dark mb-12 font-serif text-center">ارسال و بازگشت</h1>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-primary-50 p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4 text-accent-dark">
                                <Truck size={32} />
                            </div>
                            <h3 className="font-bold mb-2">ارسال رایگان</h3>
                            <p className="text-sm text-gray-600">برای خرید‌های بالای ۲۵۰۰ افغانی</p>
                        </div>
                        <div className="bg-primary-50 p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4 text-accent-dark">
                                <Clock size={32} />
                            </div>
                            <h3 className="font-bold mb-2">زمان تحویل</h3>
                            <p className="text-sm text-gray-600">۲ تا ۳ روز کاری در کابل</p>
                        </div>
                        <div className="bg-primary-50 p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4 text-accent-dark">
                                <RotateCcw size={32} />
                            </div>
                            <h3 className="font-bold mb-2">بازگشت کالا</h3>
                            <p className="text-sm text-gray-600">تا ۷ روز ضمانت بازگشت</p>
                        </div>
                    </div>

                    <div className="space-y-8 text-accent-dark leading-8 text-justify">
                        <div>
                            <h2 className="text-xl font-bold mb-4 font-serif border-r-4 border-accent-dark pr-3">شرایط ارسال</h2>
                            <p>
                                ما در فروشگاه شین تلاش می‌کنیم تا سفارشات شما را در سریع‌ترین زمان ممکن پردازش و ارسال کنیم. سفارشات ثبت شده در روزهای کاری ظرف ۲۴ ساعت بسته‌بندی و تحویل پست یا پیک داده می‌شوند. زمان تحویل برای شهر کابل ۱ تا ۲ روز کاری و برای ولایات دیگر ۳ تا ۵ روز کاری است.
                            </p>
                            <p className="mt-2">
                                هزینه ارسال برای سفارشات بالای ۲۵۰۰ افغانی رایگان است. برای سفارشات کمتر، هزینه ارسال ثابت ۱۵۰ افغانی برای کابل و ۲۵۰ افغانی برای ولایات محاسبه می‌شود.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4 font-serif border-r-4 border-accent-dark pr-3">رویه بازگرداندن کالا</h2>
                            <p>
                                رضایت شما برای ما بسیار مهم است. اگر به هر دلیلی از خرید خود راضی نیستید، می‌توانید تا ۷ روز پس از دریافت کالا، آن را بازگردانید یا تعویض کنید.
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                                <li>کالا باید استفاده نشده و در بسته‌بندی اصلی باشد.</li>
                                <li>تگ‌ها و برچسب‌های کالا نباید جدا شده باشند.</li>
                                <li>فاکتور خرید باید همراه کالا باشد.</li>
                                <li>هزینه ارسال بازگشت کالا (مگر در موارد نقص فنی یا اشتباه از سمت ما) بر عهده مشتری است.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4 font-serif border-r-4 border-accent-dark pr-3">نحوه درخواست بازگشت</h2>
                            <p>
                                برای هماهنگی جهت بازگشت کالا، لطفاً با شماره پشتیبانی ما تماس بگیرید یا به ما ایمیل بزنید. تیم پشتیبانی ما شما را راهنمایی خواهند کرد.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
