const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const id = mongoose.Types.ObjectId;

const Data = new Schema({
    pm25: String,
    pm10: String,
    aqi: String,
    date: String
});

module.exports = mongoose.model('Data', Data);
