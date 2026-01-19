import mongoose from 'mongoose';

// Check if model already exists to prevent OverwriteModelError in serverless env
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, default: 0, required: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
