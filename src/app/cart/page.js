'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import useCartStore from '../../../store/useCartStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    // Cart store utilities
    const { cartItems, removeFromCart, updateQty, itemsPrice, itemsCount, clearCart, setLastOrder } = useCartStore();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [step, setStep] = useState(1);
    const [error, setError] = useState(''); // validation error state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        country: 'Afghanistan', // Default country
        phoneCode: '+93', // Default phone code
        deliveryMethod: 'normal', // default to normal delivery
        paymentMethod: 'hesabpay', // default to hesabpay (real payment)
    });

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Confetti animation and order finalisation
    const handleCheckout = async () => {
        setIsLoading(true);
        // Determine shipping cost based on selected delivery method
        let shippingCost = 0;
        if (formData.deliveryMethod === 'fast') shippingCost = 150;
        else if (formData.deliveryMethod === 'normal') shippingCost = 100;

        const subtotal = itemsPrice();
        const total = subtotal + shippingCost;
        const orderData = {
            id: 'SHEEN-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString('fa-IR'),
            items: [...cartItems],
            customer: {
                ...formData,
                phone: `${formData.phoneCode} ${formData.phone}`, // Combine code and number
            },
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
            setIsLoading(false);
            // You could show a toast here
            return;
        }

        // Store order for receipt page
        setLastOrder(orderData);

        // Store order for receipt page
        setLastOrder(orderData);

        if (formData.paymentMethod === 'cash') {
            // Cash payment - immediate success
            // Redirect to receipt with success flag to trigger clearCart and confetti
            router.push(`/receipt?orderId=${orderData.id}&payment=success`);
            return;
        }

        // Online Payment Flow (HesabPay)
        try {
            const payRes = await fetch('/api/hesabpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
            const payData = await payRes.json();

            if (payData.paymentUrl) {
                // Redirect to HesabPay - DO NOT clear cart yet (wait for success callback)
                window.location.href = payData.paymentUrl;
                // Don't set isLoading(false) here, as we are navigating away
                return;
            } else {
                console.error('HesabPay creation failed', payData);
                alert('خطا در ارتباط با درگاه پرداخت. لطفاً دوباره تلاش کنید.');
                setIsLoading(false);
            }
        } catch (e) {
            console.error('HesabPay error', e);
            alert('خطا در برقراری ارتباط با پرداخت');
            setIsLoading(false);
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
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => { handleInputChange(e); if (error) setError(''); }}
                                    placeholder="نام کامل *"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none transition ${error && !formData.name.trim() ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent-dark'}`}
                                />

                                {/* Phone Number with Country Code */}
                                <div className="flex gap-2" dir="ltr">
                                    <select
                                        name="phoneCode"
                                        value={formData.phoneCode}
                                        onChange={handleInputChange}
                                        className="border border-gray-200 rounded-lg px-2 py-3 focus:outline-none focus:border-accent-dark transition bg-white w-24 text-sm"
                                    >
                                        <option value="+93">+93 (AF)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+49">+49 (DE)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+971">+971 (UAE)</option>
                                        <option value="+92">+92 (PK)</option>
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+98">+98 (IR)</option>
                                    </select>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) => { handleInputChange(e); if (error) setError(''); }}
                                        placeholder="Mobile Number *"
                                        className={`flex-grow border rounded-lg px-4 py-3 focus:outline-none transition text-right ${error && !formData.phone.trim() ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent-dark'}`}
                                    />
                                </div>

                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) => { handleInputChange(e); if (error) setError(''); }}
                                    placeholder="آدرس دقیق *"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none transition ${error && !formData.address.trim() ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent-dark'}`}
                                />

                                <div className="flex gap-4">
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => { handleInputChange(e); if (error) setError(''); }}
                                        placeholder="شهر/استان *"
                                        className={`w-1/2 border rounded-lg px-4 py-3 focus:outline-none transition ${error && !formData.city.trim() ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent-dark'}`}
                                    />
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-1/2 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition bg-white"
                                    >
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="United States">United States</option>
                                        <option value="Germany">Germany</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="UAE">UAE</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="India">India</option>
                                        <option value="Iran">Iran</option>
                                    </select>
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                                <div className="flex justify-end mt-8">
                                    <button
                                        onClick={() => {
                                            if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim()) {
                                                setError('لطفاً تمام فیلدهای ستاره‌دار را پر کنید.');
                                                return;
                                            }
                                            setError('');
                                            setStep(2);
                                        }}
                                        className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md"
                                    >
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
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent-dark transition">
                                    <input type="radio" name="deliveryMethod" value="pickup" checked={formData.deliveryMethod === 'pickup'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <span className="font-medium">دریافت حضوری از فروشگاه (رایگان)</span>
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
                                <label className={`p-4 border rounded-lg flex items-center cursor-pointer transition ${formData.paymentMethod === 'hesabpay' ? 'border-accent-dark bg-gray-50' : 'border-gray-200'}`}>
                                    <input type="radio" name="paymentMethod" value="hesabpay" checked={formData.paymentMethod === 'hesabpay'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <div>
                                        <span className="font-bold text-accent-dark block">پرداخت آنلاین (HesabPay)</span>
                                        <span className="text-xs text-gray-500">پرداخت امن با کارت‌های بانکی و حساب پی</span>
                                    </div>
                                </label>

                                <label className={`p-4 border rounded-lg flex items-center cursor-pointer transition ${formData.paymentMethod === 'cash' ? 'border-accent-dark bg-gray-50' : 'border-gray-200'}`}>
                                    <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} className="ml-3 accent-accent-dark" />
                                    <div>
                                        <span className="font-bold text-accent-dark block">پرداخت نقدی (Cash)</span>
                                        <span className="text-xs text-gray-500">پرداخت هنگام تحویل یا دریافت حضوری</span>
                                    </div>
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
                                    <div className="flex justify-between"><span className="text-gray-500">تلفن:</span> <span className="font-medium">{formData.phoneCode} {formData.phone}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">آدرس:</span> <span className="font-medium">{formData.address}, {formData.city}, {formData.country}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">روش ارسال:</span> <span className="font-medium">
                                        {formData.deliveryMethod === 'fast' ? 'سریع' : formData.deliveryMethod === 'normal' ? 'عادی' : 'دریافت حضوری'}
                                    </span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">روش پرداخت:</span> <span className="font-medium">
                                        {formData.paymentMethod === 'cash' ? 'نقدی (Cash)' : 'آنلاین (HesabPay)'}
                                    </span></div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                                    <h3 className="text-base font-bold mb-4 border-b border-gray-200 pb-2">خلاصه هزینه</h3>
                                    <div className="flex justify-between text-gray-600">
                                        <span>قیمت کالاها:</span>
                                        <span>{itemsPrice().toLocaleString()} افغانی</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>هزینه ارسال:</span>
                                        <span>
                                            {formData.deliveryMethod === 'fast' ? '150' : formData.deliveryMethod === 'normal' ? '100' : '0'} افغانی
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-accent-dark pt-3 border-t border-gray-200 mt-2">
                                        <span>مبلغ قابل پرداخت:</span>
                                        <span>{(itemsPrice() + (formData.deliveryMethod === 'fast' ? 150 : formData.deliveryMethod === 'normal' ? 100 : 0)).toLocaleString()} افغانی</span>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <button onClick={() => setStep(3)} className="text-gray-500 hover:text-accent-dark font-medium">بازگشت</button>
                                    <button onClick={handleCheckout} disabled={isLoading} className="bg-accent-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-md w-1/2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                درحال پردازش...
                                            </>
                                        ) : (
                                            'ثبت سفارش نهایی'
                                        )}
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
