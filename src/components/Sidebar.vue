<template>
  <div class="sidebar card position-sticky" style="top: 20px">
    <div class="card-body" v-if="props">
      <h5 class="card-title">Odaberite filtere</h5>
      <!-- Pretraživanje lokacije -->
      <form @submit.prevent="search">
        <!-- Location Input -->
        <div class="form-group">
          <label for="location">Lokacija:</label>
          <input
            type="text"
            class="form-control"
            id="location"
            placeholder="Upišite lokaciju..."
            v-model="location"
          />
        </div>
        <!-- Slider-->
        <div class="form-group">
          <label for="price">Cijena: </label>
          <div class="form-group">
            <slider
              class="slider"
              v-model="price"
              id="price"
              :min="props.price.min"
              :max="props.price.max"
            />
          </div>
        </div>
        <!-- Broj soba -->
        <div class="form-group">
          <label for="rooms">Broj soba: </label>
          <div class="form-group">
            <slider
              class="slider"
              v-model="rooms"
              id="rooms"
              :min="props.rooms.min"
              :max="props.rooms.max"
            />
          </div>
        </div>
        <!-- Površina -->
        <div class="form-group">
          <label for="surface">Površina stana u m²: </label>
          <div class="form-group">
            <slider
              class="slider"
              v-model="surface"
              id="surface"
              :min="props.surface.min"
              :max="props.surface.max"
            />
          </div>
        </div>
        <!-- Pitanja -->
        <div
          class="form-check form-group"
          v-for="(value, preference) in preferences"
          :key="preference"
        >
          <label class="form-check-label clickable">
            {{ preference }}
            <input
              class="form-check-input clickable mb-2"
              type="checkbox"
              v-model="preferences[preference]"
            />
          </label>
        </div>

        <!-- Kat -->
        <div class="form-group">
          <label for="floors">Kat: </label>
          <div class="form-group">
            <slider
              class="slider"
              v-model="floors"
              id="floors"
              :min="props.floors.min"
              :max="props.floors.max"
            />
          </div>
        </div>
        <div v-if="floors[1] != 0" class="mb-3">
          <input
            class="form-check-input clickable"
            type="checkbox"
            v-model="lift"
          />
          <label class="form-check-label clickable">Lift?</label>
        </div>

        <!-- Submit -->
        <div class="form-group">
          <button type="submit" class="btn">Traži</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slider from "@vueform/slider/dist/slider.vue2.js";
import toggle from "@vueform/toggle/dist/toggle.vue2.js";
import VueFormGenerator from "vue-form-generator";

export default {
  data() {
    return {
      price: [0, 1000],
      location: null,
      rooms: [1, 5],
      surface: [1, 200],
      preferences: {
        "Parking?": false,
        "Ljubimci?": false,
        "Pušenje?": false,
        "Dostupno tijekom sezone?": false,
        "Namještaj?": false,
      },
      floors: [0, 10],
      lift: false,
    };
  },
  props: {
    props: Object,
  },
  name: "Sidebar",
  computed: {
    sidebarData() {
      return {
        price: this.price,
        location: this.location,
        rooms: this.rooms,
        surface: this.surface,
        preferences: this.preferences,
        floors: this.floors,
        lift: this.lift,
      };
    },
  },
  mounted() {
    const storedData = JSON.parse(localStorage.getItem("sidebarData")) || {};
    Object.assign(this, storedData);
  },
  watch: {
    sidebarData: {
      deep: true,
      handler(newValue) {
        localStorage.setItem("sidebarData", JSON.stringify(newValue));
      },
    },
  },
  methods: {
    search() {
      /* Parametri koji šaljemo backendu kako bi filtrirao rezultate iz baze podataka */
      const queryParams = {
        location: this.location,
        minPrice: this.price[0],
        maxPrice: this.price[1],
        minRooms: this.rooms[0],
        maxRooms: this.rooms[1],
        minSurface: this.surface[0],
        maxSurface: this.surface[1],
        minFloors: this.floors[0],
        maxFloors: this.floors[1],
        parking: this.preferences["Parking?"],
        pets: this.preferences["Ljubimci?"],
        smoking: this.preferences["Pušenje?"],
        season: this.preferences["Dostupno tijekom sezone?"],
        furnished: this.preferences["Namještaj?"],
        lift: this.lift,
      };
      /* Izbacujemo sve null, false i 0 vrijednosti kako ne bi nepotrebno imali dugačak URL */
      const filteredQueryParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([key, value]) => value !== null && value !== false && value !== 0
        )
      );
      /* Dodajemo te parametre te idemo na tu stranicu */
      this.$router.push({ query: filteredQueryParams }).catch(() => {});
      this.$router.go();
    },
  },
  components: {
    slider,
    toggle,
    VueFormGenerator,
  },
};
</script>

<style scoped>
.slider {
  margin-top: 35px;
  margin-bottom: 10px;
}

.sidebar {
  color: #f5f5f5;
  background-color: #2c3e50;
  border: 1px solid #acabab;
}
</style>
