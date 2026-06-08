import mongoose from 'mongoose';

export async function connect() {
    if (!process.env.MONGO_URI) {
        return;
        return;
    }
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        const connection = mongoose.connection;

        connection.on('connected', () => {
            
        });

        connection.on('error', (err) => {
            
        });

    } catch (error) {
        
    }
}