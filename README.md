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
The idea was to build a centralised network of air purifiers which can turn themselves on whenever the air needs cleaning, futhermore this network would also send an SMS to people who own the air purifiers when it is dangerous to go outside. This network would be completely autonomous and would not require any user input. 
## Inspiration
"Technology should recede in the background and feel like nothing" - Nothing
## Presentation
The presentation which we made for the project at HTM can be found [here](https://bit.ly/3xIzzFI). 

## How it Works
The whole project is hosted on the rpi4 making it a standalone entity. For the frontend admin dashboard, we used Vue.js and Tailwind CSS for the UI. The air quality data was taken from the OpenWeather API to simulate the data we would get from a hardware sensor and the Twilio API was used to send SMS alerts to the user. The data was stored in a MongoDB database to interface between the backend and the Raspberry Pi.

