import dbConnect from '../../../../lib/db';
import Order from '../../../../lib/models/Order';

export async function POST(request) {
    try {
        await dbConnect();
        const orderData = await request.json();
        const order = new Order(orderData);
        await order.save();
        return new Response(JSON.stringify({ success: true, orderId: order.id }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Order API error:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
