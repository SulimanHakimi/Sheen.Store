'use client';

import Navbar from '../../components/Navbar';
import Reveal from '../../components/Reveal';

export default function PrivacyPolicy() {
    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Reveal>
                    <h1 className="text-3xl md:text-4xl font-bold text-accent-dark mb-8 font-serif border-b pb-4">حریم خصوصی</h1>

                    <div className="space-y-6 text-accent-dark leading-8 text-justify">
                        <p>
                            در فروشگاه شین، ما به حریم خصوصی شما احترام می‌گذاریم و متعهد به حفاظت از اطلاعات شخصی شما هستیم. این سیاست حفظ حریم خصوصی نحوه جمع‌آوری، استفاده و اشتراک‌گذاری اطلاعات شما را توضیح می‌دهد.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۱. اطلاعاتی که ما جمع‌آوری می‌کنیم</h2>
                        <p>
                            ما اطلاعاتی را که شما مستقیماً در اختیار ما قرار می‌دهید جمع‌آوری می‌کنیم، مانند زمانی که حساب کاربری ایجاد می‌کنید، سفارش می‌دهید، در خبرنامه ما مشترک می‌شوید یا با پشتیبانی مشتریان تماس می‌گیرید. این اطلاعات ممکن است شامل نام، آدرس ایمیل، آدرس پستی، شماره تلفن و اطلاعات پرداخت باشد.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۲. نحوه استفاده از اطلاعات</h2>
                        <p>
                            ما از اطلاعات شما برای پردازش سفارشات، ارتباط با شما در مورد وضعیت سفارش، ارسال پیشنهادات تبلیغاتی (در صورت تمایل شما) و بهبود تجربه خرید شما استفاده می‌کنیم.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۳. امنیت اطلاعات</h2>
                        <p>
                            ما اقدامات امنیتی مناسبی را برای محافظت از اطلاعات شخصی شما در برابر دسترسی غیرمجاز، افشاء، تغییر یا تخریب به کار می‌گیریم.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 font-serif">۴. کوکی‌ها</h2>
                        <p>
                            وب‌سایت ما ممکن است از کوکی‌ها برای بهبود تجربه کاربری، تجزیه و تحلیل ترافیک سایت و شخصی‌سازی محتوا استفاده کند. شما می‌توانید تنظیمات مرورگر خود را برای رد کوکی‌ها تغییر دهید، اما این ممکن است برخی از عملکردهای سایت را محدود کند.
                        </p>

                        <p className="mt-8 text-sm text-gray-500">
                            آخرین به روز رسانی: ۲۹ جدی ۱۴۰۳
                        </p>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
