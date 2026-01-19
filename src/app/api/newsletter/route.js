import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../../lib/db';
import Newsletter from '../../../../lib/models/Newsletter';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        await connectDB();
        const { email } = await request.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
        }

        // Save to database
        await Newsletter.create({ email });

        // Optional: Send welcome email (configure transporter with real credentials)
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        // });
        // await transporter.sendMail({ ... });

        return NextResponse.json({ message: 'Thank you for subscribing!' }, { status: 201 });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
