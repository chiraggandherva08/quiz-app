import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            socketTimeoutMS: 90000,
        });
        console.info("MongoDB connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { connectDb };
