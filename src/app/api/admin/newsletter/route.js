import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Newsletter from '../../../../../lib/models/Newsletter';

export async function GET() {
    try {
        await connectDB();
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Fetch newsletter error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
