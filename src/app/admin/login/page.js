'use client';
import { signIn } from 'next-auth/react';
import Navbar from '../../../components/Navbar';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-6 font-serif text-accent-dark">ورود به پنل مدیریت</h1>
                    <p className="text-gray-600 mb-8">لطفاً برای دسترسی به پنل مدیریت وارد شوید.</p>

                    <button
                        onClick={() => signIn('google', { callbackUrl: '/admin' })}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                        <span className="font-medium text-gray-700">ورود با گوگل</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
