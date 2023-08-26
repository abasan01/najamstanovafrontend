<template>
  <div class="card" style="width: 18rem">
    <img
      src="https://images.pexels.com/photos/4652004/pexels-photo-4652004.jpeg?auto=compress&cs=tinysrgb&w=1600"
      class="card-img-top"
    />
    <div class="card-body">
      <h5 class="card-title">Stan oglas</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Površina: 231 m²</li>
      <li class="list-group-item">Cijena: 1000 €</li>
      <li class="list-group-item">Lokacija: Negdje</li>
    </ul>
    <div class="card-body">
      <router-link to="/home/detail" class="card-link"
        >Detalji oglasa</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Ad",
  props: {
    msg: String,
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
