import mongoose from 'mongoose';

// Use the same env var name as elsewhere
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || '';

if (!MONGODB_URI) {
    console.warn('⚠️ No MongoDB URI provided – DB connection will be skipped.');
}

/**
 * Connect to MongoDB. In development we cache the connection to avoid
 * exhausting the connection pool. In production the function simply returns
 * if no URI is configured, allowing the build to succeed.
 */
export default async function dbConnect() {
    if (!MONGODB_URI) {
        // No DB needed (e.g., during static build)
        return;
    }
    // Use a global cache to preserve the connection across hot reloads
    if (global._mongoConn && global._mongoConn.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            // Mongoose 7+ options are fine with defaults
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

