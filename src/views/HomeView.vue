<template>
  <div class="container">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-3">
        <sidebar :props="minMax" />
      </div>

      <!-- Oglasi -->
      <div class="col-9 row">
        <ad
          class="col-span-4 m-2"
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
      minMax: null,
    };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.adsData = await ads.getAds(urlParams);
    this.minMax = await this.returnMinMax();
  },
  methods: {
    findMinMax(array, key) {
      return array.reduce(
        (result, obj) => {
          const value = obj[key];
          result.min = Math.min(result.min, value);
          result.max = Math.max(result.max, value);
          return result;
        },
        { min: array[0][key], max: array[0][key] }
      );
    },
    async returnMinMax() {
      const array = await ads.getAds();

      return {
        price: this.findMinMax(array, "price"),
        rooms: this.findMinMax(array, "rooms"),
        surface: this.findMinMax(array, "surface"),
        floors: this.findMinMax(array, "floors"),
      };
    },
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
