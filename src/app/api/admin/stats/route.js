import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Order from '../../../../../lib/models/Order';
import Product from '../../../../../lib/models/Product';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Count total products
        const productsCount = await Product.countDocuments();

        // Count total orders
        const ordersCount = await Order.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ paymentMethod: { $ne: 'failed' } }); // Exclude failed payments if you track them
        const revenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

        // Get recent orders (last 5)
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

        return NextResponse.json({
            products: productsCount,
            orders: ordersCount,
            revenue,
            recentOrders
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
