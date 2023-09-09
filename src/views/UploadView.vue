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
          @vdropzone-success="handleSuccess"
          @vdropzone-file-added="addedFile"
          @vdropzone-removed-file="removeFile"
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
      <button type="submit" class="btn btn-primary">Dodaj oglas</button>
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
        createdBy: JSON.parse(users.getUser()).email,
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
  methods: {
    /* Funkcija koja provjerava jel sve ispunjeno kako treba */
    validateFields() {
      this.errors.title =
        this.ad.title.length < 10 ? "Naslov mora biti dulji od 10 slova!" : "";

      this.errors.url =
        this.ad.url.length < 1 ? "Dodajte bar jednu sliku!" : "";

      this.errors.description =
        this.ad.description.length < 10
          ? "Opis mora biti dulji od 10 slova!"
          : "";

      this.errors.location =
        this.ad.location.length < 1 ? "Upišite lokaciju!" : "";

      this.errors.price =
        this.ad.price < 1 ? "Cijena ne smije biti manja od 1!" : "";

      this.errors.rooms =
        this.ad.rooms < 1 ? "Broj soba ne može biti manje od 1!" : "";

      this.errors.surface =
        this.ad.surface < 1 ? "Površina ne može biti manje od 1!" : "";

      this.errors.floors =
        this.ad.floors < 0 ? "Kat ne smije biti manji od 0!" : "";

      /* Provjera ako nema errora, odnosno da li su svi errori prazan string */
      return Object.values(this.errors).every((error) => error === "");
    },
    async submitAd() {
      console.log("SubmitAd");
      if (this.validateFields()) {
        /* Ubacujemo vrijednosti za da/ne pitanja */
        this.ad.parking = this.preferences["Parking?"];
        this.ad.pets = this.preferences["Ljubimci?"];
        this.ad.smoking = this.preferences["Pušenje?"];
        this.ad.season = this.preferences["Dostupno tijekom sezone?"];
        this.ad.furnished = this.preferences["Namještaj?"];

        const response = await ads.postAds(this.ad);
        this.$refs.myDropzone.disable();
        console.log("success!, response: ", response);
        this.$router.push({ name: "home" });
      } else {
        console.error(this.errors);
        this.$router.go();
      }
    },
    /* Funkcija koja se izvodi nakon što je slika uploadana, punimo ad.url array sa url-ovima */
    handleSuccess(file, response) {
      console.log("Name:", file.name);
      this.ad.url.push({ name: file.name, url: response.url });
    },
    addedFile(file) {
      if (this.ad.url.some((obj) => obj["name"] === file.name)) {
        alert("Ne možete imati istu sliku dvaput!");
        this.$refs.myDropzone.removeFile(file);
      } else {
        console.log("OK");
      }
    },
    /* Funckija za micanje slika */
    removeFile(file) {
      console.log("File removed! ", file.name);
      const index = this.ad.url.findIndex((obj) => obj["name"] === file.name);
      this.ad.url.splice(index, 1);
    },
  },
  components: {
    dropzone,
  },
  async mounted() {},
  name: "UploadView",
};
</script>
