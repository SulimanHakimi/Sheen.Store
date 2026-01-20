'use client';

import Navbar from '../../components/Navbar';
import Reveal from '../../components/Reveal';

export default function TermsOfService() {
    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Reveal>
                    <h1 className="text-3xl md:text-4xl font-bold text-accent-dark mb-8 font-serif border-b pb-4">شرایط و قوانین استفاده</h1>

                    <div className="space-y-6 text-accent-dark leading-8 text-justify">
                        <p>
                            به وب‌سایت فروشگاه شین خوش آمدید. با دسترسی و استفاده از این وب‌سایت، شما موافقت می‌کنید که به شرایط و قوانین زیر پایبند باشید. لطفاً قبل از خرید، این شرایط را به دقت مطالعه کنید.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۱. ثبت سفارش</h2>
                        <p>
                            تمامی سفارشات منوط به در دسترس بودن محصول و تایید قیمت سفارش می‌باشد. پس از ثبت سفارش، یک ایمیل تایید دریافت خواهید کرد. این ایمیل به منزله تایید نهایی و پذیرش سفارش شما نیست.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۲. قیمت‌گذاری و پرداخت</h2>
                        <p>
                            تمام قیمت‌ها به افغانی (AFN) درج شده است. ما تمام تلاش خود را می‌کنیم تا اطمینان حاصل کنیم که تمام جزئیات، توضیحات و قیمت‌ها دقیق هستند، اما ممکن است خطاهایی رخ دهد. در صورت بروز خطا در قیمت محصولی که سفارش داده‌اید، در اسرع وقت به شما اطلاع خواهیم داد.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۳. مالکیت معنوی</h2>
                        <p>
                            محتوای موجود در این وب‌سایت، از جمله متن، گرافیک، لوگو، تصاویر و نرم‌افزار، متعلق به شین حجاب است و توسط قوانین کپی‌رایت محافظت می‌شود.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۴. تغییرات در شرایط</h2>
                        <p>
                            شین حجاب حق دارد در هر زمان و بدون اطلاع قبلی، این شرایط و قوانین را تغییر دهد. ادامه استفاده شما از وب‌سایت پس از اعمال تغییرات به منزله پذیرش شرایط جدید است.
                        </p>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
