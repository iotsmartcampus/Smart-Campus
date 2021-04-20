
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`Erro! ${error.message}`.red.bold);
    process.exit(1);
  }
};
export default connectDB;
