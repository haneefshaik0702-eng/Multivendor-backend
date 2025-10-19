import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set — continuing without DB (for local dev set .env).');
    return;
  }
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');
}
