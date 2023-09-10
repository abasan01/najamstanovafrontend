<template>
  <div class="container mt-5" v-if="adData">
    <div class="row">
      <div class="col-md-6">
        <!-- Slika -->
        <img
          v-for="url in adData.url"
          :key="url.name"
          :src="url.url"
          class="card-img-top"
        />
      </div>
      <div class="col-md-6">
        <!-- Detalji -->
        <h2>{{ adData.title }}</h2>
        <p>Lokacija: {{ adData.location }}</p>
        <p>Cijena: {{ adData.price }}€</p>
        <p>Broj soba: {{ adData.rooms }}</p>
        <p>Kat: {{ adData.floor }}. kat</p>
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
      <a
        v-if="currentUser != adData.createdBy.email && currentUser"
        @click="newConversation()"
        >Dopisujte se s korisnikom</a
      >
      <!-- Izmjenjivanje oglasa -->

      <a v-if="currentUser == adData.createdBy.email" @click="pushRoute()"
        >Izmjenite oglas</a
      >
    </div>
  </div>
</template>

<script>
import { ads, users, messages } from "@/services";

export default {
  data() {
    return {
      adData: null,
      currentUser: "",
    };
  },
  async mounted() {
    try {
      this.adData = await ads.getAdsDetail(this.$route.params.id);
      this.currentUser = JSON.parse(users.getUser())?.email || "";

      console.log(this.currentUser);
      console.log(this.adData.createdBy.email);
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
  name: "DetailView",
};
</script>
