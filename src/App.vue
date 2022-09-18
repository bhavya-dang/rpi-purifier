<template>
  <div>
    <input type="text" v-on:keyup.enter="getWeather" v-model="lat" id="lat">
    <input type="text" v-on:keyup.enter="getWeather" v-model="lon" id="lon" style="margin-left: 5px;">
    <button @click="getWeather" style="margin-left: 5px;">Get Weather</button>
    <div v-if="data">
      <h1>PM2.5: {{ pm25 }}</h1>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: 'App',
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

}

</script>

