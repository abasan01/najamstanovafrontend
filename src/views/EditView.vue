<template>
  <div class="container mt-4" v-if="adData">
    <h2 class="mb-4">Promijeni oglas</h2>

    <!-- Forma za oglas -->
    <form @submit.prevent="submitAd">
      <div class="form-group">
        <label for="title">Naslov</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="adData.title"
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
          @vdropzone-mounted="dropzoneMounted"
          @vdropzone-removed-file="removeThisFile"
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
          v-model="adData.description"
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
          v-model="adData.location"
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
          v-model="adData.price"
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
          v-model="adData.rooms"
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
          v-model="adData.surface"
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
          v-model="adData.floors"
          required
        />
      </div>
      {{ errors.floors }}

      <div v-if="adData.floors != 0">
        <input class="form-check-input" type="checkbox" v-model="adData.lift" />
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
import { ads, users } from "@/services";

export default {
  data() {
    return {
      /* podaci o oglasu */
      adData: null,
      imageUrls: [{}],
      /* da/ne pitanja */
      preferences: {
        "Parking?": false,
        "Ljubimci?": false,
        "Pušenje?": false,
        "Dostupno tijekom sezone?": false,
        "Namještaj?": false,
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
        addRemoveLinks: true,
      },
    };
  },
  async mounted() {
    this.adData = await ads.getAdsDetail(this.$route.params.id);
    console.log(this.adData);
  },
  methods: {
    dropzoneMounted() {
      this.imageUrls = this.adData.url;
      this.adData.url.forEach((adUrl) => {
        var file = { size: 123, name: adUrl, type: "image/png" };
        var url = adUrl;
        this.$refs.myDropzone.manuallyAddFile(file, url);
      });
    },
    /* Funkcija koja provjerava jel sve ispunjeno kako treba */
    validateFields() {
      this.errors.title =
        this.adData.title.length < 10
          ? "Naslov mora biti dulji od 10 slova!"
          : "";

      this.errors.url =
        this.$refs.myDropzone.getQueuedFiles().length < 1
          ? "Dodajte bar jednu sliku!"
          : "";

      this.errors.description =
        this.adData.title.description < 10
          ? "Opis mora biti dulji od 10 slova!"
          : "";

      this.errors.location =
        this.adData.location.length < 1 ? "Upišite lokaciju!" : "";

      this.errors.price =
        this.adData.title.price < 1 ? "Cijena ne smije biti manja od 1!" : "";

      this.errors.rooms =
        this.adData.title.rooms < 1 ? "Broj soba ne može biti manje od 1!" : "";

      this.errors.surface =
        this.adData.title.surface < 1
          ? "Površina ne može biti manje od 1!"
          : "";

      this.errors.floors =
        this.adData.title.floors < 0 ? "Kat ne smije biti manji od 0!" : "";

      /* Provjera ako nema errora, odnosno da li su svi errori prazan string */
      return Object.values(this.errors).every((error) => error === "");
    },
    async submitAd() {
      if (this.validateFields()) {
        /* Ubacujemo vrijednosti za da/ne pitanja */
        (this.adData.parking = this.preferences["Parking?"]),
          (this.adData.pets = this.preferences["Ljubimci?"]),
          (this.adData.smoking = this.preferences["Pušenje?"]),
          (this.adData.season = this.preferences["Dostupno tijekom sezone?"]),
          (this.adData.furnished = this.preferences["Namještaj?"]),
          console.log(this.adData);

        /* Uploadamo slike */
        this.$refs.myDropzone.processQueue();
      } else {
        console.log(this.errors);
      }
    },
    /* Funkcija koja se izvodi nakon što su sve slike uploadane */
    async queueComplete() {
      console.log("queueComplete");
      /*     const response = await ads.postAds(this.adData);
      if (response) {
        console.log("success!, response: ", response);
        this.$router.push({ name: "home" });
      } */
    },
    /* Funkcija koja se izvodi nakon što je slika uploadana, punimo adData.url array sa url-ovima */
    handleSuccess(file, response) {
      console.log("File:", file);
      console.log("Response:", response.asset_id);
      this.imageUrls.push(response.url);
      console.log(this.imageUrls);
    },
    /* Funckija za micanje slika */
    removeThisFile(file) {
      console.log("file: ", JSON.parse(file.xhr.response).asset_id);
      console.log("File removed!");
      this.imageUrls = this.imageUrls.filter((item) => item !== file.url);
      console.log(this.imageUrls);
    },
  },
  components: {
    dropzone,
  },
  name: "EditView",
};
</script>
