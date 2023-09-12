<template>
  <div class="container mt-5" v-if="adData">
    <div class="row">
      <div class="col-8">
        <slider animation="fade" v-if="adData.url.length > 1">
          <slider-item v-for="image in adData.url" :key="image._id">
            <img class="slider-image" :src="image.url" />
          </slider-item>
        </slider>
        <!-- Slika -->
        <img
          v-if="adData.url.length == 1"
          :src="adData.url[0].url"
          class="card-img-top"
        />
      </div>
      <div class="col-4 info-container">
        <!-- Detalji -->
        <h2>{{ adData.title }}</h2>
        <p>
          Lokacija: <span>{{ adData.location }}</span>
        </p>
        <p>
          Cijena: <span>{{ adData.price }}€</span>
        </p>
        <p>
          Broj soba: <span>{{ adData.rooms }}</span>
        </p>
        <p>
          Površina: <span>{{ adData.surface }} m²</span>
        </p>
        <p v-if="adData.floors">
          Kat: <span>{{ adData.floors }}. kat</span>
        </p>
        <p>
          Lift: <span v-if="adData.lift">Ima</span>
          <span v-if="!adData.lift">Nema</span>
        </p>
        <p>
          Pušenje: <span v-if="adData.smoking">Dozvoljeno</span>
          <span v-if="!adData.smoking">Nije dozvoljeno</span>
        </p>
        <p>
          Kućni ljubimci: <span v-if="adData.pets">Dozvoljeni</span>
          <span v-if="!adData.pets">Nisu dozvoljeni</span>
        </p>
        <p>
          Parking: <span v-if="adData.parking">Ima</span>
          <span v-if="!adData.parking">Nema</span>
        </p>
        <p>
          Dostupno tijekom turističke sezone:
          <span v-if="adData.pets">Dostupno</span>
          <span v-if="!adData.pets">Nedostupno</span>
        </p>
        <p>
          Namještaj: <span v-if="adData.furnished">Ima</span>
          <span v-if="!adData.furnished">Bez namještaja</span>
        </p>
        <p>
          Oglas zadnje izmijenjen: <span>{{ timeagoUpdate }}</span>
        </p>
        <p>
          Oglas napravljen: <span>{{ timeagoCreate }}</span>
        </p>
        <p>
          Oglas objavio: <span>{{ adData.createdBy.email }}</span>
        </p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <!-- Description -->
        <h3>Opis Apartmana</h3>
        <p>
          {{ adData.description }}
        </p>
      </div>
      <!-- Dopisivanje sa korisnikom -->
      <div>
        <button
          class="btn"
          v-if="currentUser != adData.createdBy.email && currentUser"
          @click="newConversation()"
        >
          Dopisujte se s korisnikom
        </button>
        <!-- Izmjenjivanje oglasa -->

        <button
          class="btn"
          v-if="currentUser == adData.createdBy.email"
          @click="pushRoute()"
        >
          Izmjenite oglas
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ads, users, messages } from "@/services";
import moment from "moment";
moment.locale("hr");

export default {
  data() {
    return {
      adData: null,
      currentUser: "",
      index: 0,
      list: Array(5)
        .fill()
        .map((_, i) => `http://lorempixel.com/400/200/sports/${i}/`),
    };
  },
  async mounted() {
    try {
      this.adData = await ads.getAdsDetail(this.$route.params.id);
      this.currentUser = JSON.parse(users.getUser())?.email || "";

      console.log(this.adData);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async newConversation() {
      await messages.addConversations(this.adData.createdBy);
      this.$router.push({
        name: "messages",
        params: { id: this.adData.createdBy },
      });
    },
    pushRoute() {
      this.$router.push({ name: "edit", params: { id: this.adData._id } });
    },
  },
  computed: {
    timeagoUpdate() {
      return moment(this.adData.updatedAt).fromNow();
    },
    timeagoCreate() {
      return moment(this.adData.createdAt).fromNow();
    },
  },
  name: "DetailView",
};
</script>

<style scoped>
img {
  object-fit: cover;
  border-radius: 10px;
  width: 100%;
}

.slider {
  border-radius: 20px;
  height: 400px !important;
}

.slider-image {
  height: 100%;
  object-fit: contain;
}

.info-container p {
  font-weight: bold;
}
.info-container span {
  font-weight: 100;
}
</style>
