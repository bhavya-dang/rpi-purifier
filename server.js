const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const app = express();
const Data = require('./models/Data');
const client = require('./twilio');


// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.post('/api/v1/data', async(req) => {
    // console.log(req.body)
    // console.log("From server.js", req.body.pm10, req.body.pm2_5, req.body.aqi, req.body.date);
    if (req.body.pm10 > 10) {
        console.log("PM10 is greater than 10");
        await client.messages.create({
          body: `PM10 is greater than 10. It is ${this.pm10}`,
          from: process.env.VUE_APP_FROM,
          to: process.env.VUE_APP_TO
        })
        .then(message => console.log(message.sid));
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