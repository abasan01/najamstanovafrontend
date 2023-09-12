<template>
  <div class="container mt-4" v-if="adData">
    <h2 class="mb-4">Promijeni oglas</h2>

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
            v-model="adData.title"
            placeholder="Upišite naslov..."
            required
          />
        </div>
        <p class="p-red">{{ errors.title }}</p>
        <!-- Upload za slike -->
        <div class="center d-flex justify-content-center align-items-center">
          <dropzone
            ref="myDropzone"
            id="image-dropzone"
            :options="dropzoneOptions"
            @vdropzone-success="handleSuccess"
            @vdropzone-file-added="addedFile"
            @vdropzone-mounted="dropzoneMounted"
            @vdropzone-removed-file="removeFile"
            required
          ></dropzone>
        </div>
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
            v-model="adData.description"
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
            v-model="adData.location"
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
            v-model="adData.price"
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
            v-model="adData.rooms"
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
            v-model="adData.surface"
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
            v-model="adData.floors"
            placeholder="Upišite broj katova..."
            required
          />
        </div>
      </div>
      <p class="p-red">{{ errors.floors }}</p>

      <div v-if="adData.floors != 0">
        <input class="form-check-input" type="checkbox" v-model="adData.lift" />
        <label class="form-check-label">Lift</label>
      </div>
      <button type="submit" class="my-3 btn">Izmijeni oglas</button>
    </form>

    <button @click="showModal()" class="btn btn-danger">Izbriši oglas</button>

    <div
      class="modal fade"
      id="confirmDelete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Upozorenje</h5>
          </div>
          <div class="modal-body">
            Jeste li sigurni da želite obrisati oglas?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteAd()">
              Da
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="cancelDelete()"
            >
              Ne
            </button>
          </div>
        </div>
      </div>
    </div>
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
      imageUrls: [],
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
    if (!this.adData) {
      this.$router.push({ name: "home" });
      return;
    }
    if (this.adData.createdBy.email == JSON.parse(users.getUser()).email) {
      console.log(this.adData);
    } else {
      alert("Ovo nije vaš oglas!");
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    showModal() {
      $("#confirmDelete").modal("show");
    },
    async deleteAd() {
      await ads.deleteAds(this.$route.params.id);
      $("#confirmDelete").modal("hide");
      this.$router.push({ name: "home" });
    },
    cancelDelete() {
      $("#confirmDelete").modal("hide");
    },
    dropzoneMounted() {
      this.adData.url.forEach((adUrl) => {
        var file = { size: 123, name: adUrl.name, type: "image/png" };
        var url = adUrl.url;
        this.$refs.myDropzone.manuallyAddFile(file, url);
        this.imageUrls.push(adUrl);
      });
    },
    /* Funkcija koja provjerava jel sve ispunjeno kako treba */
    validateFields() {
      this.errors.title =
        this.adData.title.length < 10
          ? "Naslov mora biti dulji od 10 slova!"
          : "";

      this.errors.url =
        this.adData.url.length < 1 ? "Dodajte bar jednu sliku!" : "";

      this.errors.description =
        this.adData.description.length < 10
          ? "Opis mora biti dulji od 10 slova!"
          : "";

      this.errors.location =
        this.adData.location.length < 1 ? "Upišite lokaciju!" : "";

      this.errors.price =
        this.adData.price < 1 ? "Cijena ne smije biti manja od 1!" : "";

      this.errors.rooms =
        this.adData.rooms < 1 ? "Broj soba ne može biti manje od 1!" : "";

      this.errors.surface =
        this.adData.surface < 1 ? "Površina ne može biti manje od 1!" : "";

      this.errors.floors =
        this.adData.floors < 0 ? "Kat ne smije biti manji od 0!" : "";

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
          (this.adData.url = this.imageUrls);
        console.log(this.adData);

        await ads.updateAds(this.adData, this.$route.params.id);
        window.location.href = "/oglasi";
      } else {
        console.error(this.errors);
      }
    },
    /* Funkcija koja se izvodi nakon što je slika uploadana, punimo adData.url array sa url-ovima */
    handleSuccess(file, response) {
      console.log("Sucess!");
      console.log("Name:", file.name);
      this.imageUrls.push({ name: file.name, url: response.url });
    },
    addedFile(file) {
      console.log("this.imageUrls: ", this.imageUrls);
      if (this.imageUrls.some((obj) => obj["name"] === file.name)) {
        alert("Ne možete imati istu sliku dvaput!");
        this.$refs.myDropzone.removeFile(file);
      } else {
        console.log("OK");
      }
    },
    /* Funckija za micanje slika */
    removeFile(file) {
      console.log("File removed! ", file.name);
      const index = this.imageUrls.findIndex(
        (obj) => obj["name"] === file.name
      );
      this.imageUrls.splice(index, 1);
    },
  },
  components: {
    dropzone,
  },
  name: "EditView",
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

.vue-dropzone img {
  object-fit: cover !important;
}

.vue-dropzone:hover {
  background-color: #15d897;
  color: #f5f5f5;
}

.dropzone .dz-message {
  color: #f5f5f5;
  opacity: 0.8;
}

.vue-dropzone .dz-preview .dz-details {
  background-color: #10b981;
  color: #f5f5f5;
  border-radius: 20px;
}

.vue-dropzone .dz-preview .dz-image {
  background-color: #10b981;
  color: #f5f5f5;
  border-radius: 20px;
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

.btn-danger {
  background-color: #d92246;
  border: 1px solid #b41d3b;
  color: #f5f5f5;
}
.btn-danger:hover {
  background-color: #d92246;
  border: 1px solid #b41d3b;
  color: #f5f5f5;
}

.modal-content {
  background-color: #2c3e50;
}
</style>
