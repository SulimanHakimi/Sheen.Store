import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db';
import Order from '../../../../../lib/models/Order';

export async function POST(request) {
    try {
        const body = await request.json();
        const signature = request.headers.get('x-hesabpay-signature');

        // TODO: Validate signature using your webhook secret
        // const isValid = validateSignature(body, signature, process.env.HESAB_PAY_WEBHOOK_SECRET);
        // if (!isValid) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });

        console.log('HesabPay Webhook Received:', body);

        await connectDB();

        const { id, status, reference_id } = body;

        // Example: Update order status based on webhook event
        // You'll need to match 'reference_id' or 'id' to your Order ID

        if (status === 'success' || status === 'paid') {
            // Find order by ID (assuming you sent your Order ID as reference or Metadata)
            // const order = await Order.findOne({ id: reference_id });
            // if (order) {
            //    order.paymentStatus = 'paid';
            //    order.hesabPayTransactionId = id;
            //    await order.save();
            // }
            console.log(`Payment successful for transaction ${id}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json(
            { message: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
