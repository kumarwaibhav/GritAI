import mongoose from "mongoose";

// Module-level cache persists across requests within the same serverless container.
// This is the standard Next.js + MongoDB pattern — avoids reconnecting on every warm request.
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
    (global as any).__mongoose_cache ?? { conn: null, promise: null };

(global as any).__mongoose_cache = cached;

export async function connect() {
    // Already connected — return immediately (fastest path, ~0ms)
    if (cached.conn) return cached.conn;

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error(
            "MONGO_URI is not set. Add it to your Vercel environment variables."
        );
    }

    // Connection in progress — await existing promise instead of creating a new one
    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,   // fail fast if not connected
            maxPoolSize: 10,         // reuse up to 10 connections
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null; // reset so next request retries
        throw err;
    }

    return cached.conn;
}
