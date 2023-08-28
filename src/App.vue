<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg border-bottom border">
      <button
        class="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          <img style="width: 50px" src="@/assets/logo.png"
        /></router-link>

        <div
          class="collapse navbar-collapse justify-content-md-center"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mt-2 mt-lg-0">
            <!--  <li class="nav-item active" v-if="authenticated"> -->
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'home' }"
                >Oglasi</router-link
              >
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'upload' }"
                >Dodaj Oglas</router-link
              >
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'messages' }"
                >Poruke</router-link
              >
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'login' }"
                >Ulogiraj se</router-link
              >
            </li>
            <li class="nav-item active">
              <span class="nav-link clickable">Odlogiraj se</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
