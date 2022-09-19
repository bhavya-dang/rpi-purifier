# Raspberry Pi - Centralised Air Purifying System
A completely autonomous and centralised air purifying system for your home. I and [@jailbreakervc](https://github.com/jailbreakerVC) built this prototype as our project for the [Hack the Mountains 3.0](https://www.hackthemountain.tech/) hackathon.

## Tech Stack
- Raspberry Pi 4
- Vue.js
- MongoDB
- Tailwind CSS
- Twilio API
- OpenWeather API

## Idea
The idea was to build an autonomous system of air purifiers for minimal cost and maximum efficiency with more or less no user input. As it is also a centralised network, other such purifiers can also connect to our system and can ideally become more effective. It is also capable of sending notifications to the user if the air quality is not good.

## How it Works
The whole project is hosted on the rpi making it a standalone entity. For the frontend dashboard, we used Vue.js and Tailwind CSS for the UI. The air quality data was simulated from the OpenWeather API and the Twilio API was used to send SMS alerts to the user. The data was stored in a MongoDB database to interface between the backend and the Raspberry Pi.

