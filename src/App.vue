<template>
  <div class="relative container">
    <div class="box p-10 bg-white">
      <h1 class="text-center text-black text-2xl font-semibold">Raspberry Pi // Air Purifier Admin Dashboard</h1>
      <h3></h3>
    </div>


    <h1 class="p-4 text-pink-600 font-bold text-2xl">Your Location:</h1>
    
    <label for="lat" class="font-semibold ml-4">Latitude:</label>
    <input class="p-2 m-4 bg-pink-600 rounded-md" placeholder="Enter Latitude: " type="text" v-on:keyup.enter="getWeather" v-model="lat" id="lat">
    <label for="lat" class="font-semibold ml-4">Longitude:</label>
    <input class="p-2 m-4 bg-pink-600 rounded-md" placeholder="Enter Longitude: " type="text" v-on:keyup.enter="getWeather" v-model="lon" id="lon">
    <button class="bg-gray-200 text-pink-600 p-2 rounded-md border-solid border-2 border-white" @click="getWeather" style="margin-left: 5px;">Get Weather</button>
    <div v-if="data" class="ml-5 mt-2">
      <h3 class="pm10 font-bold text-2xl">{{ pm10 }} μg/m3</h3>
      <span class="levels font-light text-md">PM10 LEVELS</span>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      lat: "",
      lon: "",
      pm25: null,
      pm10: null,
      aqi: null,
      API_KEY: process.env.VUE_APP_API_KEY,
      data : null
    }
  },
  mounted() {
    console.log('mounted');
    this.getLocation();
    },
  methods: {
    async getWeather() {
      let url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}`;
      fetch(url)
        .then(res => res.json())
        .then(async data => {
          this.data = data;
          this.pm10 = data.list[0].components.pm10,
          this.pm25 = data.list[0].components.pm2_5,
          this.aqi = data.list[0].main.aqi
          console.log(`From Vue: PM10: ${this.pm10}, PM2.5: ${this.pm25}, AQI: ${this.aqi}`);

        const res = axios({
        url: "/api/v1/data",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Accept' : 'application/json'
        },
        data: JSON.stringify({
          pm25: this.pm25,
          pm10: this.pm10,
          aqi: this.aqi,
          date: new Date().toLocaleString()
        })
      });
      let d = await res;
      console.log("Data saved in db: ", d);
        })
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          console.log(`Lat: ${this.lat}, Lon: ${this.lon}`);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
  }

};
 
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,200&display=swap');
  html, body {
    height: 100%;
    background-color: #16213E;
  }
  pm10, levels{
    font-family: 'Fira Sans', sans-serif;
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style> 

