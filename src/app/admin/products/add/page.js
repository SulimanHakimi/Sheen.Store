'use client';

import { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import withAdminAuth from '../../../../components/withAdminAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'clothing', // default
        description: '',
        images: '', // comma separated URL string for simplicity in MVP
        isFeatured: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert images string to array
            const imageArray = formData.images.split(',').map(img => img.trim()).filter(img => img);

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    images: imageArray
                })
            });

            if (res.ok) {
                toast.success('محصول با موفقیت اضافه شد');
                router.push('/admin');
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'خطا در افزودن محصول');
            }
        } catch (error) {
            console.error(error);
            toast.error('خطای شبکه');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold font-serif text-accent-dark mb-8 border-b pb-4">افزودن محصول جدید</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">نام محصول</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">قیمت (افغانی)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">دسته‌بندی</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition bg-white"
                                >
                                    <option value="clothing">پوشاک</option>
                                    <option value="accessories">اکسسوری</option>
                                    <option value="beauty">آرایشی و بهداشتی</option>
                                    <option value="shoes-bags">کیف و کفش</option>
                                    <option value="شال">شال</option>
                                    <option value="روسری">روسری</option>
                                    <option value="عبایا">عبایا</option>
                                    <option value="ورزشی">ورزشی</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">توضیحات</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">آدرس تصاویر (با کاما جدا کنید)</label>
                            <input
                                type="text"
                                name="images"
                                value={formData.images}
                                onChange={handleChange}
                                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent-dark transition text-left"
                                dir="ltr"
                            />
                            <p className="text-xs text-gray-500 mt-1 text-right">لینک مستقیم تصاویر را وارد کنید.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                id="isFeatured"
                                className="w-5 h-5 accent-accent-dark"
                            />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">نمایش در صفحه اصلی (ویژه)</label>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-dark text-white font-bold py-4 rounded-lg hover:bg-black transition shadow-md disabled:opacity-70"
                            >
                                {loading ? 'در حال ثبت...' : 'افزودن محصول'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default withAdminAuth(AddProductPage);
