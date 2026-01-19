
import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Product from '../../../../../lib/models/Product';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const product = await Product.findById(params.id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
