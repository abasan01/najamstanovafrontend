<template>
  <div class="container mt-5" v-if="adData">
    <div class="row">
      <div class="col-md-6">
        <!-- Slika -->
        <img
          src="https://images.pexels.com/photos/4652004/pexels-photo-4652004.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Apartment Image"
          class="img-fluid mb-4"
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
    </div>
  </div>
</template>

<script>
import { ads } from "@/services";

export default {
  data() {
    return {
      adData: null,
    };
  },
  async mounted() {
    this.adData = await ads.getAdsDetail(this.$route.params.id);
  },
  name: "HomeView",
};
</script>
