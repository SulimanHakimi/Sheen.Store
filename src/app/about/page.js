'use client';

import Navbar from '../../../components/Navbar';
import Reveal from '../../../components/Reveal';

import { FaGem, FaShippingFast, FaPaintBrush } from 'react-icons/fa';

export default function About() {
    const teamMembers = [
        {
            name: 'سلیمان حکیمی',
            role: 'مدیر و بنیان‌گذار',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQH2jDaojHEPeA/profile-displayphoto-scale_400_400/B4EZt0fR1VJwAo-/0/1767185916706?e=1770249600&v=beta&t=6G3iAhTe2Z-GxbzOXT9EYjBrajrmW8Af8xvHRcmJRdc'
        },
        {
            name: 'لیلا وکیلی',
            role: 'طراح ارشد',
            image: 'https://cdn.vectorstock.com/i/500p/46/72/cute-cartoon-girl-avatar-black-hair-yellow-shir-vector-58404672.jpg'
        },
        {
            name: 'جواد حکیمی',
            role: 'مدیر مالی',
            image: 'https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/357033915_820433626083956_3505582704764224201_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=gLiVO9t7qpUQ7kNvwFAnVWZ&_nc_oc=AdkJedOvCCmDMnMji1cWotHHhbof1gREE8ATZDhpv_m6ebh8G0brmHcmmpJgkq5dwCA&_nc_zt=23&_nc_ht=scontent-ord5-1.xx&_nc_gid=SXAkfNAD3usDlUsiRO-ipQ&oh=00_Afq_hxMTFPcX4Q-2WAdvXfkK1JE2ct2y00qBQ9zgDmUZNg&oe=6972FAAE'
        }
    ];

    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center mb-16" style={{ backgroundImage: "url('/images/hero-bg-2.jpg')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <Reveal>
                    <div className="relative text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-md">درباره شین</h1>
                        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto drop-shadow-sm">
                            داستانی از زیبایی، اصالت و وقار
                        </p>
                    </div>
                </Reveal>
            </div>

            <div className="container mx-auto px-4 pb-20 max-w-5xl">
                {/* Introduction */}
                <Reveal>
                    <div className="text-center mb-20 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent-dark">ماموریت ما</h2>
                        <div className="text-gray-600 leading-8 text-lg text-justify md:text-center max-w-3xl mx-auto space-y-6 font-light">
                            <p>
                                به فروشگاه شین خوش آمدید، جایی که زیبایی و کیفیت در هم می‌آمیزند. ما با هدف ارائه جدیدترین و باکیفیت‌ترین مدل‌های پوشاک بانوان، شال و روسری فعالیت خود را آغاز کرده‌ایم.
                            </p>
                            <p>
                                تیم طراحان ما همواره در تلاشند تا با الهام از ترندهای روز دنیا و تلفیق آن با فرهنگ اصیل خودمان، محصولاتی را خلق کنند که هم مدرن باشند و هم اصالت داشته باشند. ما از بهترین پارچه‌ها استفاده می‌کنیم تا لطافت و راحتی را به شما هدیه دهیم.
                            </p>
                            <p>
                                رضایت شما اولویت اصلی ماست. ما متعهد به ارائه خدمات عالی به مشتریان، ارسال سریع و پشتیبانی دلسوزانه هستیم.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        <div className="bg-white p-10 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="bg-primary-50 p-4 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                    <FaGem size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-accent-dark mb-4 font-serif">کیفیت برتر</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">استفاده از پارچه‌های درجه یک و دوخت ظریف برای ماندگاری و زیبایی بیشتر.</p>
                        </div>
                        <div className="bg-white p-10 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="bg-primary-50 p-4 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                    <FaShippingFast size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-accent-dark mb-4 font-serif">ارسال سریع</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">تحویل سفارشات در کوتاه‌ترین زمان ممکن به سراسر کشور با بسته‌بندی ایمن.</p>
                        </div>
                        <div className="bg-white p-10 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="flex justify-center mb-6">
                                <div className="bg-primary-50 p-4 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                    <FaPaintBrush size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-accent-dark mb-4 font-serif">طراحی خاص</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">کالکشن‌های منحصر به فرد و مد روز که توسط طراحان خلاق ما آماده می‌شوند.</p>
                        </div>
                    </div>
                </Reveal>

                {/* Team Section */}
                <Reveal delay={0.3}>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent-dark mb-12">تیم ما</h2>
                        <div className="grid md:grid-cols-3 gap-10">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="group flex flex-col items-center">
                                    <div className="w-40 h-40 mb-6 relative rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-xl font-bold text-accent-dark mb-1 font-serif">{member.name}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
