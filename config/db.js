const mongoose = require('mongoose');
// const config = require('config');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()

const uri = `mongodb+srv://${process.env.VUE_APP_ID}:${process.env.VUE_APP_PASS}@cluster0.sbvkt.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;