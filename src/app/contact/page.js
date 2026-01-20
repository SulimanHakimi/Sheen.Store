'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Reveal from '../../components/Reveal';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaTelegram, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('پیام شما با موفقیت ارسال شد!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error(data.error || 'خطایی رخ داده است');
            }
        } catch (error) {
            toast.error('ارسال پیام با مشکل مواجه شد');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />

            <div className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center mb-16" style={{ backgroundImage: "url('/images/hero-bg-2.jpg')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-2 font-serif drop-shadow-md">تماس با ما</h1>
                    <p className="text-white/90 text-center">ما همیشه آماده پاسخگویی به شما هستیم</p>
                </Reveal>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <Reveal delay={0.1}>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-full text-accent-dark">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-accent-dark mb-1">تلفن</h3>
                                    <p className="text-accent-dark" dir="ltr">+93 784 966 018</p>
                                    <p className="text-accent-dark" dir="ltr">+93 708 738 568</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-full text-accent-dark">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-accent-dark mb-1">ایمیل</h3>
                                    <p className="text-accent-dark">info@sheen.af</p>
                                    <p className="text-accent-dark">support@sheen.af</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-full text-accent-dark">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-accent-dark mb-1">آدرس</h3>
                                    <p className="text-accent-dark leading-relaxed">
                                        افغانستان، کابل
                                    </p>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-accent-dark mb-4">ما را دنبال کنید</h3>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/hijab.sheen" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-3 rounded-full text-accent-dark hover:bg-accent-dark hover:text-white transition-colors duration-300">
                                        <FaInstagram size={20} />
                                    </a>
                                    <a href="https://t.me/hijabsheen" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-3 rounded-full text-accent-dark hover:bg-accent-dark hover:text-white transition-colors duration-300">
                                        <FaTelegram size={20} />
                                    </a>
                                    <a href="https://wa.me/93784966018" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-3 rounded-full text-accent-dark hover:bg-accent-dark hover:text-white transition-colors duration-300">
                                        <FaWhatsapp size={20} />
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-3 rounded-full text-accent-dark hover:bg-accent-dark hover:text-white transition-colors duration-300">
                                        <FaFacebookF size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Contact Form */}
                    <Reveal delay={0.2}>
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <div className="mb-6">
                                <label className="block text-accent-dark font-bold mb-2">نام کامل</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-dark focus:ring-1 focus:ring-accent-dark transition outline-none"
                                    placeholder="نام خود را وارد کنید"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-accent-dark font-bold mb-2">ایمیل</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-dark focus:ring-1 focus:ring-accent-dark transition outline-none"
                                    placeholder="example@mail.com"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-accent-dark font-bold mb-2">پیام شما</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-dark focus:ring-1 focus:ring-accent-dark transition outline-none h-32"
                                    placeholder="چطور می‌توانیم کمکتان کنیم؟"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-accent-dark text-white font-bold py-3 rounded-lg hover:bg-black transition shadow-md hover:shadow-lg disabled:opacity-50">
                                {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
