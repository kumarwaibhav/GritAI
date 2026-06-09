import mongoose from 'mongoose';

export async function connect() {
    if (!process.env.MONGO_URI) {
        console.error("[DB] MONGO_URI is not set — database unavailable");
        return;
    }
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("[DB] MongoDB connected");
        });

        connection.on('error', (err) => {
            console.error("[DB] MongoDB connection error:", err.message);
        });

        connection.on('disconnected', () => {
            console.warn("[DB] MongoDB disconnected");
        });

    } catch (error: any) {
        console.error("[DB] Failed to connect to MongoDB:", error.message);
    }
}