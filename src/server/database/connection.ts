import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const envUri: string = process.env.MONGO_URI ?? '';
    const con = await mongoose.connect(envUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
