'use client';
import { useState, useEffect } from 'react';
import withAdminAuth from '../../components/withAdminAuth';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

function AdminDashboard() {
    const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0 });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        // Fetch valid dashboard data (placeholders for now)
        // You can implement API calls to /api/admin/stats here
    }, []);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-serif text-accent-dark">پنل مدیریت</h1>
                    <div className="space-x-4 space-x-reverse">
                        <Link href="/admin/products/add" className="bg-accent-dark text-white px-4 py-2 rounded-lg hover:bg-black transition">افزودن محصول</Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-bold mb-2">سفارشات کل</h3>
                        <p className="text-3xl font-bold text-accent-dark">{stats.orders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-bold mb-2">درآمد کل</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.revenue.toLocaleString()} افغانی</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-bold mb-2">محصولات</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.products}</p>
                    </div>
                </div>

                {/* Recent Orders Table Placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-4">سفارشات اخیر</h2>
                    <p className="text-gray-500 text-center py-8">در حال بارگذاری اطلاعات...</p>
                </div>
            </div>
        </main>
    );
}

export default withAdminAuth(AdminDashboard);
