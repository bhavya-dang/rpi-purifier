// eslint-disable-next-line no-unused-vars
let dotenv = require('dotenv').config();
const accountSid = process.env.VUE_APP_SID;
const authToken = process.env.VUE_APP_AUTH;
const client = require('twilio')(accountSid, authToken);

module.exports = client;
