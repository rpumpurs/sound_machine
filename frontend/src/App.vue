<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Pi Controller</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="navbar-text px-2">
          <label>Temperature:</label> {{temperature}}&#8451;
        </div>
        <div class="navbar-text px-2">
          <label>Uptime:</label> {{uptime}}
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import DeviceService from "@/services/DeviceService";

export default {
  name: "app",
  data() {
    return {
      temperature: 0,
      uptime: 0
    };
  },
  methods: {
    getTemperature() {
      DeviceService.getTemperature()
          .then(response => {
            this.temperature = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getUptime() {
      DeviceService.getUptime()
          .then(response => {

            let secondsToStr = function secondsToStr (seconds) {
              function numberEnding (number) {
                return (number > 1) ? 's' : '';
              }

              let temp = response.data;
              let years = Math.floor(temp / 31536000);
              if (years) {
                return years + ' year' + numberEnding(years);
              }
              let days = Math.floor((temp %= 31536000) / 86400);
              if (days) {
                return days + ' day' + numberEnding(days);
              }
              let hours = Math.floor((temp %= 86400) / 3600);
              if (hours) {
                return hours + ' hour' + numberEnding(hours);
              }
              let minutes = Math.floor((temp %= 3600) / 60);
              if (minutes) {
                return minutes + ' minute' + numberEnding(minutes);
              }
              return seconds + ' second' + numberEnding(seconds);
            }

            this.uptime = secondsToStr(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getTemperature();
    this.getUptime();
  }
};
</script>
