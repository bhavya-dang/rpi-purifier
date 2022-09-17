<template>
  <div>
    <input type="text" v-on:keyup.enter="getWeather" v-model="lat" id="lat">
    <input type="text" v-on:keyup.enter="getWeather" v-model="lon" id="lon" style="margin-left: 5px;">
    <button @click="getWeather" style="margin-left: 5px;">Get Weather</button>
    <div v-if="data">
      <h1>PM2.5: {{ data.list[0].components.pm2_5 }}</h1>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      lat: "",
      lon: "",
      API_KEY: process.env.VUE_APP_API_KEY,
      data : null
    }
  },
  methods: {
    getWeather() {
      let url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}`;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.data = data
          console.log(data.list[0].main.pm2_5)
        })
    },
    // getPi() {
    //   fetch('dhkhdlkdnd.com')
    //     .then(() => console.log(1))
    // }
  },
}
</script>

