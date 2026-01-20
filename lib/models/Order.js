import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    items: [{
        _id: { type: String },
        name: { type: String },
        price: { type: Number },
        qty: { type: Number },
        images: [{ type: String }],
        category: { type: String },
    }],
    customer: {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        city: { type: String },
        country: { type: String },
        phoneCode: { type: String },
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryMethod: { type: String, enum: ['fast', 'normal', 'pickup'], required: true },
    paymentMethod: { type: String, enum: ['door', 'hesabpay', 'cash'], required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
