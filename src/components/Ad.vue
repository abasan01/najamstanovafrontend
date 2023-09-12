<template>
  <div class="card" style="width: 18rem">
    <img
      @click="pushRoute(props._id)"
      :src="props.url[0].url"
      class="card-img-top clickable"
    />
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Površina: {{ props.surface }} m²</li>
      <li class="list-group-item">Cijena: {{ props.price }} €</li>
      <li class="list-group-item">Lokacija: {{ props.location }}</li>
      <li class="list-group-item">Objavio: {{ props.createdBy.email }}</li>
      <li class="list-group-item">Zadnje izmijene: {{ timeAgo }}</li>
    </ul>
    <div class="card-body">
      <button class="btn" @click="pushRoute(props._id)">Detalji oglasa</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("hr");

export default {
  name: "Ad",
  props: ["props"],
  methods: {
    pushRoute(paramsId) {
      console.log(paramsId);
      this.$router.push({ name: "detail", params: { id: paramsId } });
    },
  },
  computed: {
    timeAgo() {
      return moment(this.props.updatedAt).fromNow();
    },
  },
};
</script>

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
.card {
  color: #f5f5f5;
  background-color: #2c3e50;
  border: 1px solid #acabab;
  padding: 10px;
}

img {
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.list-group-item {
  background-color: #2c3e50;
  color: #f5f5f5;
}
</style>
