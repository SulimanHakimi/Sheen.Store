'use client';

import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import useCartStore from '../../../store/useCartStore';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    // Cart store utilities
    const { cartItems, removeFromCart, updateQty, itemsPrice, itemsCount, clearCart, setLastOrder } = useCartStore();
    const router = useRouter();

    const [showCheckout, setShowCheckout] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        deliveryMethod: 'normal', // default to normal delivery
        paymentMethod: 'door', // default to door payment
    });

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Confetti animation and order finalisation
    const handleCheckout = async () => {
        // Determine shipping cost based on selected delivery method
        const shippingCost = formData.deliveryMethod === 'fast' ? 150 : 100;
        const subtotal = itemsPrice();
        const total = subtotal + shippingCost;
        const orderData = {
            id: 'SHEEN-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString('fa-IR'),
            items: [...cartItems],
            customer: { ...formData },
            subtotal,
            shipping: shippingCost,
            total,
            deliveryMethod: formData.deliveryMethod,
            paymentMethod: formData.paymentMethod,
        };

        // Save order to database via API
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
            if (!res.ok) throw new Error('Failed to save order');
        } catch (err) {
            console.error(err);
            // You could show a toast here
            return;
        }

        // Store order for receipt page
        setLastOrder(orderData);
        clearCart();

        // Trigger confetti animation
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

        // Redirect based on payment method
        if (formData.paymentMethod === 'hesabpay') {
            // Initiate payment via hesabpay API
            try {
                const payRes = await fetch('/api/hesabpay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData),
                });
                const payData = await payRes.json();
                if (payData.paymentUrl) {
                    router.push(payData.paymentUrl);
                    return;
                }
            } catch (e) {
                console.error('HesabPay error', e);
            }
            // Fallback to receipt if payment URL not obtained
            router.push('/receipt');
        } else {
            // Door payment – go straight to receipt
            router.push('/receipt');
        }
    };

    // Empty cart screen
    if (cartItems.length === 0) {
        return (
            <main className="flex-grow bg-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-24 text-center">
                    <h2 className="text-2xl font-bold text-accent-dark mb-4 font-serif">سبد خرید شما خالی است</h2>
                    <Link href="/shop" className="text-accent-dark border-b border-accent-dark hover:text-gray-600 hover:border-gray-600 transition pb-1">بازگشت به فروشگاه</Link>
                </div>
            </main>
        );
    }

    // Main cart view – either cart list or checkout steps
    return (
        <main className="flex-grow bg-white min-h-screen text-accent-dark">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-accent-dark mb-8 border-b pb-4">سبد خرید</h1>
                {showCheckout ? (
                    <div className="max-w-2xl mx-auto bg-white border border-gray-100 p-8 rounded-xl shadow-lg">
                        {/* Step indicator */}
                        <div className="flex justify-between mb-8 text-sm font-bold tracking-wide border-b border-gray-100 pb-4">
                            <span className={step === 1 ? 'text-accent-dark border-b-2 border-accent-dark pb-4 -mb-4.5' : 'text-gray-400'}>۱. اطلاعات تحویل</span>
                            <span className={step === 2 ? 'text-accent-dark border-b-2 border-accent-dark pb-4 -mb-4.5' : 'text-gray-400'}>۲. روش تحویل</span>
                            <span className={step === 3 ? 'text-accent-dark border-b-2 border-accent-dark pb-4 -mb-4.5' : 'text-gray-400'}>۳. روش پرداخت</span>
                            <span className={step === 4 ? 'text-accent-dark border-b-2 border-accent-dark pb-4 -mb-4.5' : 'text-gray-400'}>۴. مرور نهایی</span>
                        </div>

                        {step === 1 && (
                            <div className="space-y-5">
                                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="نام کامل" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition" />
                                <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="شماره تماس" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition" />
                                <input name="address" value={formData.address} onChange={handleInputChange} placeholder="آدرس دقیق" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition" />
                                <input name="city" value={formData.city} onChange={handleInputChange} placeholder="شهر/استان" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition" />
                                <div className="flex justify-end mt-8">
                                    <button onClick={() => setStep(2)} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md">
                                        ادامه
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* 2. Delivery Method */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent-dark transition">
                                    <input type="radio" name="deliveryMethod" value="fast" checked={formData.deliveryMethod === 'fast'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <span className="font-medium">تحویل سریع (150 افغانی)</span>
                                </label>
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent-dark transition">
                                    <input type="radio" name="deliveryMethod" value="normal" checked={formData.deliveryMethod === 'normal'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <span className="font-medium">تحویل عادی (100 افغانی)</span>
                                </label>
                                <div className="flex justify-between mt-8">
                                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-accent-dark font-medium">بازگشت</button>
                                    <button onClick={() => setStep(3)} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md">
                                        ادامه
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* 3. Payment Method */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent-dark transition">
                                    <input type="radio" name="paymentMethod" value="door" checked={formData.paymentMethod === 'door'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <span className="font-medium">پرداخت درب منزل</span>
                                </label>
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent-dark transition">
                                    <input type="radio" name="paymentMethod" value="hesabpay" checked={formData.paymentMethod === 'hesabpay'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <span className="font-medium">حساب پرداخت</span>
                                </label>
                                <div className="flex justify-between mt-8">
                                    <button onClick={() => setStep(2)} className="text-gray-500 hover:text-accent-dark font-medium">بازگشت</button>
                                    <button onClick={() => setStep(4)} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md">
                                        ادامه
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* 4. Review & Confirm */}
                        {step === 4 && (
                            <div className="space-y-6 text-sm">
                                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                                    <h3 className="text-base font-bold mb-4 border-b border-gray-200 pb-2">اطلاعات تحویل</h3>
                                    <div className="flex justify-between"><span className="text-gray-500">نام:</span> <span className="font-medium">{formData.name}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">تلفن:</span> <span className="font-medium">{formData.phone}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">آدرس:</span> <span className="font-medium">{formData.address}, {formData.city}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">روش ارسال:</span> <span className="font-medium">{formData.deliveryMethod === 'fast' ? 'سریع' : 'عادی'}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">روش پرداخت:</span> <span className="font-medium">{formData.paymentMethod === 'door' ? 'درب منزل' : 'حساب پرداخت'}</span></div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                                    <h3 className="text-base font-bold mb-4 border-b border-gray-200 pb-2">خلاصه هزینه</h3>
                                    <div className="flex justify-between text-gray-600">
                                        <span>قیمت کالاها:</span>
                                        <span>{itemsPrice().toLocaleString()} افغانی</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>هزینه ارسال:</span>
                                        <span>{formData.deliveryMethod === 'fast' ? '150' : '100'} افغانی</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-accent-dark pt-3 border-t border-gray-200 mt-2">
                                        <span>مبلغ قابل پرداخت:</span>
                                        <span>{(itemsPrice() + (formData.deliveryMethod === 'fast' ? 150 : 100)).toLocaleString()} افغانی</span>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <button onClick={() => setStep(3)} className="text-gray-500 hover:text-accent-dark font-medium">بازگشت</button>
                                    <button onClick={handleCheckout} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md w-1/2">
                                        ثبت سفارش نهایی
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                        <div className="w-24 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            {item.images?.[0] && <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg text-accent-dark">{item.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                                </div>
                                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-xs hover:text-red-700 transition font-bold border border-red-100 bg-red-50 px-2 py-1 rounded">حذف</button>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center border border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                                                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                                                    >-</button>
                                                    <span className="px-2 font-medium text-sm w-8 text-center">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item._id, item.qty + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                                                    >+</button>
                                                </div>
                                                <span className="font-bold text-accent-dark text-lg">{(item.price * item.qty).toLocaleString()} افغانی</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Summary */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
                                <h2 className="text-xl font-bold mb-6 font-serif border-b border-gray-100 pb-4">خلاصه سفارش</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>تعداد اقلام:</span>
                                        <span>{itemsCount()} عدد</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>مجموع قیمت:</span>
                                        <span>{itemsPrice().toLocaleString()} افغانی</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>هزینه ارسال:</span>
                                        <span>۲۰۰ افغانی</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between font-bold text-lg text-accent-dark">
                                    <span>مبلغ نهایی:</span>
                                    <span>{(itemsPrice() + 200).toLocaleString()} افغانی</span>
                                </div>
                                <button onClick={() => setShowCheckout(true)} className="w-full bg-accent-dark text-white py-4 rounded-lg font-bold hover:bg-black transition shadow-lg text-sm uppercase tracking-wider">
                                    ادامه به پرداخت
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
