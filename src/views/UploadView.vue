<template>
  <div class="container mt-4">
    <h2 class="mb-4">Dodaj oglas</h2>

    <!-- Forma za oglas -->
    <form @submit.prevent="submitAd">
      <div class="form-group">
        <label for="title">Naslov</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="ad.title"
          required
        />
        {{ errors.title }}
        <!-- Upload za slike -->
        <dropzone
          ref="myDropzone"
          id="image-dropzone"
          :options="dropzoneOptions"
          :duplicateCheck="true"
          @vdropzone-success="handleSuccess"
          @vdropzone-queue-complete="queueComplete"
          required
        ></dropzone>
      </div>
      {{ errors.url }}
      <div class="form-group">
        <label for="description">Opis</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="ad.description"
          required
        ></textarea>
      </div>
      {{ errors.description }}
      <div class="form-group">
        <label for="description">Lokacija</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="ad.location"
          required
        ></textarea>
      </div>
      {{ errors.location }}
      <div class="form-group">
        <label for="price">Cijena u Eurima</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="ad.price"
          required
        />
      </div>
      {{ errors.price }}
      <div class="form-group">
        <label for="price">Broj soba</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="ad.rooms"
          required
        />
      </div>
      {{ errors.rooms }}
      <div class="form-group">
        <label for="price">Površina u m²</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="ad.surface"
          required
        />
      </div>
      {{ errors.surface }}
      <div
        class="form-check"
        v-for="(value, preference) in preferences"
        :key="preference"
      >
        <label class="form-check-label">
          {{ preference }}
          <input
            class="form-check-input"
            type="checkbox"
            v-model="preferences[preference]"
          />
        </label>
      </div>

      Odabrano: {{ preferences }}

      <div class="form-group">
        <label for="price">Kat</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="ad.floors"
          required
        />
      </div>
      {{ errors.floors }}

      <div v-if="ad.floors != 0">
        <input class="form-check-input" type="checkbox" v-model="ad.lift" />
        <label class="form-check-label">Lift?</label>
      </div>
      <button type="submit" class="btn btn-primary" @click="submitAd">
        Dodaj oglas
      </button>
    </form>
  </div>
</template>

<script>
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import dropzone from "vue2-dropzone";
import { ads } from "@/services";

export default {
  data() {
    return {
      /* da/ne pitanja */
      preferences: {
        "Parking?": false,
        "Ljubimci?": false,
        "Pušenje?": false,
        "Dostupno tijekom sezone?": false,
        "Namještaj?": false,
      },
      /* Objekt koji šaljemo na backend */
      ad: {
        title: "",
        url: [],
        description: "",
        location: "",
        price: 1,
        rooms: 1,
        surface: 1,
        parking: false,
        pets: false,
        season: false,
        furnished: false,
        floors: 0,
        lift: false,
      },
      /* Errori */
      errors: {
        title: "",
        url: "",
        description: "",
        location: "",
        price: "",
        rooms: "",
        surface: "",
        floors: "",
      },
      /* Opcije za dropzone */
      dropzoneOptions: {
        url: "https://api.cloudinary.com/v1_1/dymtk2sbc/upload",
        acceptedFiles: "image/*",
        params: {
          upload_preset: "ml_default",
        },
        autoProcessQueue: false,
        addRemoveLinks: true,
      },
    };
  },
  methods: {
    /* Funkcija koja provjerava jel sve ispunjeno kako treba */
    validateFields() {
      this.errors.title =
        this.ad.title.length < 10 ? "Naslov mora biti dulji od 10 slova!" : "";

      this.errors.url =
        this.$refs.myDropzone.getQueuedFiles().length < 1
          ? "Dodajte bar jednu sliku!"
          : "";

      this.errors.description =
        this.ad.title.description < 10
          ? "Opis mora biti dulji od 10 slova!"
          : "";

      this.errors.location =
        this.ad.location.length < 1 ? "Upišite lokaciju!" : "";

      this.errors.price =
        this.ad.title.price < 1 ? "Cijena ne smije biti manja od 1!" : "";

      this.errors.rooms =
        this.ad.title.rooms < 1 ? "Broj soba ne može biti manje od 1!" : "";

      this.errors.surface =
        this.ad.title.surface < 1 ? "Površina ne može biti manje od 1!" : "";

      this.errors.floors =
        this.ad.title.floors < 0 ? "Kat ne smije biti manji od 0!" : "";

      /* Provjera ako nema errora, odnosno da li su svi errori prazan string */
      return Object.values(this.errors).every((error) => error === "");
    },
    async submitAd() {
      if (this.validateFields()) {
        /* Ubacujemo vrijednosti za da/ne pitanja */
        (this.ad.parking = this.preferences["Parking?"]),
          (this.ad.pets = this.preferences["Ljubimci?"]),
          (this.ad.smoking = this.preferences["Pušenje?"]),
          (this.ad.season = this.preferences["Dostupno tijekom sezone?"]),
          (this.ad.furnished = this.preferences["Namještaj?"]),
          console.log(this.ad);

        /* Uploadamo slike */
        this.$refs.myDropzone.processQueue();
      } else {
        console.log(this.errors);
      }
    },
    /* Funkcija koja se izvodi nakon što su sve slike uploadane */
    async queueComplete() {
      console.log(this.ad.url);
      const response = await ads.postAds(this.ad);
      console.log("success!, response: ", response);
    },
    /* Funkcija koja se izvodi nakon što je slika uploadana, punimo ad.url array sa url-ovima */
    handleSuccess(file, response) {
      console.log("Response:", file);
      this.ad.url.push(response.url);
    },
    /* Funckija za micanje slika */
    removeThisFile(thisFile) {
      this.$refs.myDropzone.removeFile(thisFile);
      console.log("File removed!");
    },
  },
  components: {
    dropzone,
  },
  async mounted() {},
  name: "UploadView",
};
</script>
