const dotenv=require('dotenv')
dotenv.config()
const mongoose = require('mongoose');
const MONGO_URL=process.env.MONGO_URL;
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;
