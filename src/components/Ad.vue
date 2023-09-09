<template>
  <div class="card" style="width: 18rem">
    <img :src="props.url[0].url" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Površina: {{ props.surface }} m²</li>
      <li class="list-group-item">Cijena: {{ props.price }} €</li>
      <li class="list-group-item">Lokacija: {{ props.location }}</li>
      <li class="list-group-item">Objavio: {{ props.createdBy.email }}</li>
    </ul>
    <div class="card-body">
      <a class="card-link" @click="pushRoute(props._id)">Detalji oglasa</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ad",
  props: ["props"],
  methods: {
    pushRoute(paramsId) {
      console.log(paramsId);
      this.$router.push({ name: "detail", params: { id: paramsId } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
