<template>
  <div class="container">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-3">
        <div class="card position-sticky" style="top: 20px">
          <div class="card-body">
            <h5 class="card-title">Filtriraj</h5>
            <!-- Pretraživanje lokacije -->
            <form @submit.prevent="search">
              <!-- Location Input -->
              <div class="form-group">
                <label for="location">Lokacija</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="location"
                />
              </div>
              <!-- Slider-->
              <!-- https://github.com/vueform/slider/tree/2.0.10#using-with-vue-2 -->
              <div class="form-group">
                <label for="price">Cijena</label>
                <div class="form-group">
                  <slider v-model="value" id="price" />
                </div>
              </div>
              <!-- Broj soba -->
              <div class="form-group">
                <label for="rooms">Broj soba</label>
                <div class="form-group">
                  <slider v-model="rooms" id="rooms" />
                </div>
              </div>
              <!-- Površina -->
              <div class="form-group">
                <label for="surface">Površina stana u m²</label>
                <div class="form-group">
                  <slider v-model="surface" id="surface" :max="200" />
                </div>
              </div>
              <!-- Pitanja -->
              <div
                class="form-check"
                v-for="preference in preferences"
                :key="preference"
              >
                <label class="form-check-label"
                  >{{ preference }}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="selectedPreferences"
                    :value="preference"
                /></label>
              </div>

              Odabrano: {{ selectedPreferences }}

              <!-- Kat -->
              <div class="form-group">
                <label for="floors">Kat</label>
                <div class="form-group">
                  <slider v-model="floors" id="floors" />
                </div>
              </div>
              <div v-if="floors[0]">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="lift"
                />
                <label class="form-check-label">Lift?</label>
              </div>

              <!-- Submit -->
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Traži</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Oglasi -->
      <div class="col-9 row">
        <h1>Test</h1>
        <ad class="col-span-4" v-for="card of 12" :key="card"></ad>
      </div>
    </div>
  </div>
</template>

<script>
/* Imports */
import slider from "@vueform/slider/dist/slider.vue2.js";
import toggle from "@vueform/toggle/dist/toggle.vue2.js";
import VueFormGenerator from "vue-form-generator";
import ad from "@/components/Ad.vue";

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
    };
  },
  name: "HomeView",
  components: {
    ad,
    slider,
    toggle,
    VueFormGenerator,
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
