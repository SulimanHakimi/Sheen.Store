import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Configure nodemailer transporter
        // NOTE: In a real application, use environment variables for credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email provider
            auth: {
                user: process.env.EMAIL_USER, // e.g., 'your-email@gmail.com'
                pass: process.env.EMAIL_PASS  // e.g., 'your-app-password'
            }
        });

        const mailOptions = {
            from: email, // Sender address (user's email)
            to: process.env.EMAIL_USER, // Receiver address (your admin email)
            subject: `New Contact Form Message from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
            html: `
                <h3>New Message from Contact Form</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Failed to send email. Check server logs.' }, { status: 500 });
    }
}
