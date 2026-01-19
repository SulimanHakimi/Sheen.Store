'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import ProductCard from '../../../components/ProductCard';


function ShopContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const categoryFilter = searchParams.get('cat') || '';

    // Add state for products
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setIsLoading(false);
            });
    }, []);

    // Filter products by search query and category
    const filteredProducts = useMemo(() => {
        let result = products;

        // Category Mapping
        const categoryMap = {
            'clothing': ['شال', 'روسری', 'عبایا', 'شال زمستانی', 'شال مجلسی', 'ورزشی'],
            'accessories': ['ملزومات حجاب', 'عینک', 'زیورآلات', 'کمربند'],
            'beauty': ['آرایشی', 'بهداشتی'],
            'shoes-bags': ['کیف', 'کفش']
        };

        // Filter by category if specified
        if (categoryFilter) {
            const mappedCategories = categoryMap[categoryFilter];
            if (mappedCategories) {
                result = result.filter(p => mappedCategories.includes(p.category));
            } else {
                // Fallback for direct matches or unmapped categories
                result = result.filter(p => p.category === categoryFilter);
            }
        }

        // Filter by search query if specified
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerQ) ||
                p.category.toLowerCase().includes(lowerQ) ||
                p.description.toLowerCase().includes(lowerQ)
            );
        }

        return result;
    }, [searchQuery, categoryFilter, products]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-accent-dark font-serif mb-2">
                        {categoryFilter ? categoryFilter : 'فروشگاه'}
                    </h1>
                    {searchQuery && <p className="text-gray-500">نتایج جستجو برای: &quot;{searchQuery}&quot;</p>}
                </div>
                <span className="text-gray-500">{filteredProducts.length} محصول</span>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">در حال بارگذاری...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product, idx) => (
                        <ProductCard key={product._id} product={product} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">هیچ محصولی یافت نشد.</p>
                    <button onClick={() => window.location.href = '/shop'} className="mt-4 text-primary-600 hover:underline">مشاهده همه محصولات</button>
                </div>
            )}
        </div>
    );
}

export default function Shop() {
    return (
        <main className="flex-grow bg-white min-h-screen">
            <Navbar />
            <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
                <ShopContent />
            </Suspense>
        </main>
    );
}
