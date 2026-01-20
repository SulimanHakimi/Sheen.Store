'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAdminAuth(WrappedComponent) {
    return function Component(props) {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "loading") return;

            // Redirect if not logged in or not an admin
            if (!session || session.user.role !== 'admin') {
                router.push("/admin/login");
            }
        }, [session, status, router]);

        if (status === "loading" || !session || session.user.role !== 'admin') {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
}
