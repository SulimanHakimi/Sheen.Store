import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Newsletter from '../../../../../lib/models/Newsletter';

import { authenticateAdmin } from '../../../../../lib/auth';

export async function GET(request) {
    // 1. Authenticate Admin
    const isAuthenticated = await authenticateAdmin(request);
    if (!isAuthenticated) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Fetch newsletter error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
