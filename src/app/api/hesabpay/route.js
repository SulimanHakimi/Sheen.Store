
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { items, customer, deliveryMethod, shipping, id } = body;

        // Construct items for HesabPay
        // API expects: [{ id, name, price }]
        // We aggregate the price (price * qty) to ensure the total amount is correct 
        // as the simple API example doesn't explicitly show a quantity field.
        const hesabItems = items.map(item => ({
            id: item._id,
            name: `${item.name} (${item.qty})`,
            price: item.price * item.qty
        }));

        // Add shipping as an item
        if (shipping > 0) {
            hesabItems.push({
                id: 'shipping',
                name: `Shipping (${deliveryMethod === 'fast' ? 'Fast' : 'Normal'})`,
                price: shipping
            });
        }

        // Determine base URL for callbacks
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        const payload = {
            // "email" is optional in HesabPay docs, but useful if we have it
            // customer object from cart page has: name, phone, address, city, etc.
            // It doesn't seem to have 'email' in the form data in cart/page.js, so we skip or use a placeholder if strictly required (docs say optional)
            items: hesabItems,
            redirect_success_url: `${origin}/receipt?orderId=${id}&payment=success`,
            redirect_failure_url: `${origin}/cart?error=hesabpay_failed`
        };

        const apiKey = process.env.HESAB_PAY_APIKEY;

        if (!apiKey) {
            return NextResponse.json(
                { message: 'Payment configuration missing (API Key)' },
                { status: 500 }
            );
        }

        const response = await fetch('https://api.hesab.com/api/v1/payment/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `API-KEY ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        // Some versions of the API might return { url: "..." } directly, or { success: true, payment_url: "..." }
        const paymentUrl = data.payment_url || data.url;

        if (paymentUrl) {
            return NextResponse.json({ paymentUrl });
        } else {
            console.error('HesabPay API Error (Invalid Response):', data);
            return NextResponse.json(
                { message: data.message || 'Failed to create payment session' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('HesabPay Route Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
