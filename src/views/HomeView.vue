<template>
  <div class="container">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-3">
        <sidebar />
      </div>

      <!-- Oglasi -->
      <div class="col-9 row">
        <h1>Test</h1>
        <ad
          class="col-span-4"
          v-for="ad of this.adsData"
          :key="ad._id"
          :props="ad"
        ></ad>
      </div>
    </div>
  </div>
</template>

<script>
/* Imports */
import sidebar from "@/components/Sidebar.vue";
import ad from "@/components/Ad.vue";
import { ads } from "@/services";

export default {
  data() {
    return {
      value: [0, 100],
      location: null,
      rooms: [1, 5],
      surface: [1, 200],
      preferences: [
        "Parking?",
        "Ljubimci?",
        "Pušenje?",
        "Dostupno tijekom sezone?",
        "Namještaj?",
      ],
      selectedPreferences: [],
      floors: [0, 10],
      lift: Boolean,
      adsData: null,
    };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.adsData = await ads.getAds(urlParams);
  },
  name: "HomeView",
  components: {
    ad,
    sidebar,
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
.output {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  background: #000000;
  color: #ffffff;
  padding: 20px;
  margin-bottom: 50px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 13px;
}

:root {
  --toggle-bg-on: red;
  --toggle-border-on: red;
}
</style>
