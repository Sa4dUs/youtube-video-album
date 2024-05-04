import mongoose from "mongoose";

export default async () => {
    if (!process.env.MONGODB_URI) throw new Error("Cannot connect to MongoDB");
    await mongoose.connect(process.env.MONGODB_URI);
}