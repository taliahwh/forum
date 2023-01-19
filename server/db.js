import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    // hides depracation warning
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
  } catch (error) {
    console.error(`Error ${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
