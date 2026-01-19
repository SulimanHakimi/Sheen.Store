import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Product from '../../../../lib/models/Product';

export async function GET() {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
