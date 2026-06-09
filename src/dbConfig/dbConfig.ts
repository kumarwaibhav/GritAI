import mongoose from "mongoose";

export async function connect() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI is not set — database unavailable. Add it to your Vercel environment variables.");
    }

    try {
        const conn = mongoose.connection;

        if (conn.readyState === 1) return; // Already connected

        if (conn.listenerCount("connected") === 0) {
            conn.on("connected", () => console.log("[DB] MongoDB connected"));
            conn.on("error", (err) => console.error("[DB] MongoDB error:", err.message));
            conn.on("disconnected", () => console.warn("[DB] MongoDB disconnected"));
        }

        if (conn.readyState === 0) {
            await mongoose.connect(uri);
        }
    } catch (error: any) {
        throw new Error(`[DB] Failed to connect to MongoDB: ${error.message}`);
    }
}
