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
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'home' }"
                >Oglasi</router-link
              >
            </li>
            <li v-if="loggedIn" class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'upload' }"
                >Dodaj Oglas</router-link
              >
            </li>
            <li v-if="loggedIn" class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'messages' }"
                >Poruke</router-link
              >
            </li>
            <li v-if="!loggedIn" class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'login' }"
                >Ulogiraj se</router-link
              >
            </li>
            <li v-if="loggedIn" class="nav-item active">
              <span class="nav-link clickable" @click="logout()"
                >Odlogiraj se</span
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { users } from "@/services";

export default {
  data() {
    return {
      loggedIn: !!users.getUser(),
    };
  },
  methods: {
    async logout() {
      users.logoutUser();
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f5f5f5;
}

.clickable {
  cursor: pointer;
}

nav {
  padding: 20px;
  background-color: #2c3e50;
  border: 1px solid #acabab;
  margin-bottom: 40px;
  font-size: 20px;

  .nav-link {
    color: #f5f5f5;
  }

  .nav-link:hover {
    color: #ffffff;
  }

  .nav-link:focus {
    color: #10b981;
  }

  a {
    font-weight: bold;
    color: #f5f5f5;

    &.router-link-exact-active {
      color: #10b981;
    }
  }
}

.btn {
  background-color: #10b981;
  border: 1px solid #0c7c57;
  color: #f5f5f5;
}
.btn:hover {
  background-color: #10b981;
  border: 1px solid #0c7c57;
  color: #f5f5f5;
}
.btn:disabled {
  background-color: #10b981;
  border: 1px solid #0c7c57;
  color: #f5f5f5;
}

body {
  background-color: #111d27;
  color: #f5f5f5;
}

.border {
  border: 1px solid #acabab !important;
}

.form-control {
  background-color: #10b981;
  color: #f5f5f5;
}
.form-control:focus {
  background-color: #15d897;
  color: #f5f5f5;
}
.form-control::placeholder {
  color: #f5f5f5;
  opacity: 0.8;
}
</style>
