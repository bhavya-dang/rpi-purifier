/* eslint-disable no-unused-vars */
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const app = express();
const Data = require('./models/Data');
const client = require('./twilio');
const dotenv = require('dotenv').config();

// let Gpio = require('onoff').Gpio; 
// let LED = new Gpio(4, 'out'); 
// let blinkInterval = setInterval(blinkLED, 500); 


// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.post('/api/v1/data', async(req) => {
    if (req.body.pm10 > 10) {
        console.log("PM10 is greater than 10");
        await client.messages.create({
          body: `⚠ Air is very toxic at the moment. The PM10 concentration is ${req.body.pm10} μg/m3`,
          from: process.env.VUE_APP_FROM,
          to: process.env.VUE_APP_TO
        })
        .then(message => console.log(message.sid, "Message sent"));
      }

    let dataObj = new Data({
            pm25: req.body.pm2_5,
            pm10: req.body.pm10,
            aqi:  req.body.aqi,
            date: req.body.date
          });

          dataObj.save()
            .then(res => console.log(res))
            .catch(err => console.log(err));
});
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));