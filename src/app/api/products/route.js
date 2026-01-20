import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Product from '../../../../lib/models/Product';

export async function GET() {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
}

import { authenticateAdmin } from '../../../../lib/auth';

export async function POST(request) {
    // 1. Authenticate Admin
    const isAuthenticated = await authenticateAdmin(request);
    if (!isAuthenticated) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const body = await request.json();

        // Basic validation could be added here

        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Create product error:', error); // Log full error on server
        return NextResponse.json({ message: 'Failed to create product' }, { status: 500 }); // Return generic message
    }
}
