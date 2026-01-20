'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import useCartStore from '../../../store/useCartStore';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReceiptPage() {
    const { lastOrder, clearCart } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        setMounted(true);
        if (!lastOrder) {
            router.push('/');
        } else {
            // Always clear cart when showing receipt
            clearCart();

            // Check for payment success callback
            const paymentStatus = searchParams.get('payment');
            if (paymentStatus === 'success') {
                // Trigger celebration confetti
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
                const random = (min, max) => Math.random() * (max - min) + min;
                const interval = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) return clearInterval(interval);
                    const particleCount = 50 * (timeLeft / duration);
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            }
        }
    }, [lastOrder, router, searchParams, clearCart]);

    if (!mounted || !lastOrder) return null;

    return (
        <main className="flex-grow bg-white min-h-screen font-serif text-accent-dark">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100 max-w-3xl w-full print:shadow-none print:border-none print:p-0">

                    {/* Receipt Header */}
                    <div className="text-center border-b border-gray-100 pb-8 mb-8">
                        <h2 className="text-4xl font-bold italic mb-2">sheen</h2>
                        <p className="text-gray-500 uppercase tracking-widest text-xs">فروشگاه آنلاین شین</p>
                        <div className="mt-6 flex flex-col gap-1">
                            <span className="text-green-600 font-bold text-lg">سفارش با موفقیت ثبت شد</span>
                            <span className="text-gray-400 text-sm">شماره سفارش: {lastOrder.id}</span>
                            <span className="text-gray-400 text-sm">تاریخ: {lastOrder.date}</span>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
                        <div>
                            <h3 className="font-bold text-lg mb-3 border-b border-gray-100 pb-2">اطلاعات مشتری</h3>
                            <p className="text-gray-600 mb-1"><span className="font-bold text-accent-dark">نام:</span> {lastOrder.customer.name}</p>
                            <p className="text-gray-600 mb-1"><span className="font-bold text-accent-dark">تلفن:</span> {lastOrder.customer.phone}</p>
                            <p className="text-gray-600"><span className="font-bold text-accent-dark">ایمیل:</span> {lastOrder.customer.email || '-'}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-3 border-b border-gray-100 pb-2">اطلاعات ارسال</h3>
                            <p className="text-gray-600 mb-1"><span className="font-bold text-accent-dark">آدرس:</span> {lastOrder.customer.city}، {lastOrder.customer.address}</p>
                            <p className="text-gray-600 mb-1"><span className="font-bold text-accent-dark">روش ارسال:</span> {lastOrder.customer.deliveryMethod}</p>
                            <p className="text-gray-600"><span className="font-bold text-accent-dark">روش پرداخت:</span> {lastOrder.customer.paymentMethod}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8 overflow-x-auto">
                        <table className="w-full text-right border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-accent-dark">
                                    <th className="p-3 border-b border-gray-200">#</th>
                                    <th className="p-3 border-b border-gray-200">محصول</th>
                                    <th className="p-3 border-b border-gray-200 text-center">تعداد</th>
                                    <th className="p-3 border-b border-gray-200">قیمت واحد</th>
                                    <th className="p-3 border-b border-gray-200">کل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastOrder.items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-50 last:border-none">
                                        <td className="p-3 text-gray-400">{index + 1}</td>
                                        <td className="p-3 font-medium">{item.name}</td>
                                        <td className="p-3 text-center">{item.qty}</td>
                                        <td className="p-3 text-gray-600">{item.price.toLocaleString()}</td>
                                        <td className="p-3 font-bold">{(item.price * item.qty).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mb-10">
                        <div className="w-full md:w-1/2 space-y-3 bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between text-gray-600">
                                <span>جمع کل اقلام:</span>
                                <span>{lastOrder.subtotal.toLocaleString()} افغانی</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>هزینه ارسال:</span>
                                <span>{lastOrder.shipping.toLocaleString()} افغانی</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-accent-dark border-t border-gray-200 pt-3">
                                <span>مبلغ نهایی:</span>
                                <span>{lastOrder.total.toLocaleString()} افغانی</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="bg-gray-100 text-accent-dark px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
                        >
                            چاپ فاکتور
                        </button>
                        <Link href="/" className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition text-center">
                            بازگشت به فروشگاه
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
