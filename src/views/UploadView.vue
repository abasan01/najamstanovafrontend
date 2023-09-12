<template>
  <div class="container mt-4">
    <h2 class="mb-4">Dodaj oglas</h2>

    <!-- Forma za oglas -->
    <form @submit.prevent="submitAd">
      <div class="form-group row align-items-center justify-content-center">
        <div class="col-1">
          <label class="label-right" for="title">Naslov:</label>
        </div>
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="ad.title"
            placeholder="Upišite naslov..."
            required
          />
        </div>
        <p class="p-red">{{ errors.title }}</p>
      </div>
      <!-- Upload za slike -->
      <div class="center d-flex justify-content-center align-items-center">
        <dropzone
          ref="myDropzone"
          id="image-dropzone"
          :options="dropzoneOptions"
          @vdropzone-success="handleSuccess"
          @vdropzone-file-added="addedFile"
          @vdropzone-removed-file="removeFile"
        ></dropzone>
      </div>
      <p class="p-red">{{ errors.url }}</p>
      <div class="form-group row align-items-center">
        <div class="col-2">
          <label class="label-right" for="description">Opis:</label>
        </div>
        <div class="col-9">
          <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="ad.description"
            placeholder="Upišite neki opis..."
            required
          ></textarea>
        </div>
      </div>
      <p class="p-red">{{ errors.description }}</p>
      <div class="form-group row align-items-center justify-content-start">
        <div class="col-2 offset-3">
          <label class="label-right" for="description">Lokacija:</label>
        </div>
        <div class="col-4">
          <input
            class="form-control"
            id="description"
            rows="3"
            v-model="ad.location"
            placeholder="Upišite lokaciju..."
            required
          />
        </div>
      </div>
      <p class="p-red">{{ errors.location }}</p>
      <div class="form-group row align-items-center justify-content-start">
        <div class="col-2 offset-3">
          <label class="label-right" for="price">Cijena u Eurima:</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="ad.price"
            placeholder="Upišite cijenu..."
            required
          />
        </div>
      </div>
      <p class="p-red">{{ errors.price }}</p>
      <div class="form-group row align-items-center justify-content-start">
        <div class="col-2 offset-3">
          <label class="label-right" for="price">Broj soba:</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="ad.rooms"
            placeholder="Upišite broj soba..."
            required
          />
        </div>
        <p class="p-red">{{ errors.rooms }}</p>
      </div>
      <div class="form-group row align-items-center justify-content-start">
        <div class="col-2 offset-3">
          <label class="label-right" for="price">Površina u m²:</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="ad.surface"
            placeholder="Upišite površinu..."
            required
          />
        </div>
      </div>
      <p class="p-red">{{ errors.surface }}</p>
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
      <div class="my-3 form-group row align-items-center justify-content-start">
        <div class="col-2 offset-3">
          <label class="label-right" for="price">Kat:</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="ad.floors"
            placeholder="Upišite broj katova..."
            required
          />
        </div>
      </div>
      <p class="p-red">{{ errors.floors }}</p>

      <div v-if="ad.floors != 0">
        <input class="form-check-input" type="checkbox" v-model="ad.lift" />
        <label class="form-check-label">Lift?</label>
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Dodaj oglas</button>
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
        dictRemoveFile: "Makni sliku",
        dictMessage: "Makni sliku",
        dictDefaultMessage: "Dodajte slike ovdje",
        dictFileTooBig:
          "Slika je prevelika ({{filesize}}MiB). Dopuštena veličina: {{maxFilesize}}MiB.",
        dictCancelUpload: "Makni sliku",
        dictUploadCanceled: "Slika maknuta.",
        dictInvalidFileType: "Nije slika.",
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

<style>
.vue-dropzone {
  background-color: #10b981;
  color: #f5f5f5;
  border-radius: 10px;
  width: 88%;
  margin-bottom: 10px;
}

.vue-dropzone:hover {
  background-color: #15d897;
  color: #f5f5f5;
}

.vue-dropzone .dz-preview .dz-details {
  background-color: #10b981;
  color: #f5f5f5;
  border-radius: 20px;
}

.dropzone .dz-message {
  color: #f5f5f5;
  opacity: 0.8;
}

.vue-dropzone .dz-preview .dz-image {
  background-color: #10b981;
  color: #f5f5f5;
  border-radius: 20px;
}

.vue-dropzone img {
  object-fit: cover !important;
}

.dropzone .dz-preview.dz-image-preview {
  background: none;
}

.label-right {
  float: right;
}

.p-red {
  color: #d92246;
  font-weight: bold;
}

.form-group {
  margin-bottom: 10px;
}
</style>
