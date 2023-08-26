<template>
  <div class="login">
    <section class="w-100 vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12">
            <img class="img-fluid" />
            <h1 class="mt-2">Najam Stanova</h1>
          </div>
          <div class="col-md-5 my-lg-5 py-lg-5">
            <form>
              <div
                class="d-flex flex-row align-items-center justify-content-center"
              >
                <button
                  @click="toggleLogin"
                  :disabled="state"
                  type="button"
                  class="btn btn-custom mx-4"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Ulogirajte se u svoj account"
                >
                  Ulogiravanje
                </button>

                <button
                  @click="toggleSignup"
                  :disabled="!state"
                  type="button"
                  class="btn btn-custom mx-4"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Napravite novi account ukoliko nemate svoj"
                >
                  Registracija
                </button>
              </div>

              <!-- Ime -->
              <div v-show="!state" class="form-outline mb-4 mt-4">
                <input
                  @keyup.enter="stateLS"
                  type="text"
                  id="name"
                  v-model="name"
                  class="form-control form-control-lg"
                  placeholder="Unesite svoje ime"
                />
                <label class="form-label" for="name" style="margin-left: 0px"
                  >Ime</label
                >
                <div class="form-notch">
                  <div class="form-notch-leading" style="width: 9px"></div>
                  <div class="form-notch-middle" style="width: 88.8px"></div>
                  <div class="form-notch-trailing"></div>
                </div>
              </div>

              <!-- Email -->
              <div class="form-outline mb-4 mt-4">
                <input
                  @keyup.enter="stateLS"
                  type="email"
                  v-model="email"
                  id="email"
                  class="form-control form-control-lg"
                  placeholder="Unesite svoju e-mail adresu"
                />
                <label class="form-label" for="email" style="margin-left: 0px"
                  >E-mail adresa</label
                >
                <div class="form-notch">
                  <div class="form-notch-leading" style="width: 9px"></div>
                  <div class="form-notch-middle" style="width: 88.8px"></div>
                  <div class="form-notch-trailing"></div>
                </div>
              </div>

              <!-- Password -->
              <div class="form-outline mb-3">
                <input
                  @keyup.enter="stateLS"
                  @input="checkPass"
                  type="password"
                  v-model="password"
                  id="password"
                  class="form-control form-control-lg"
                  placeholder="Unesite lozinku"
                />
                <label
                  class="form-label"
                  for="password"
                  style="margin-left: 0px"
                  >Lozinka</label
                >
              </div>

              <!-- Password repeat v-show signup -->
              <div v-show="!state" class="form-outline mb-3">
                <input
                  @keyup.enter="stateLS"
                  @input="checkPass"
                  type="password"
                  v-model="passwordRepeat"
                  id="passwordRepeat"
                  class="form-control form-control-lg"
                  placeholder="Ponovite lozinku"
                />
                <label
                  class="form-label"
                  for="passwordRepeat"
                  style="margin-left: 0px"
                  >Lozinka</label
                >
                <div class="form-notch">
                  <div class="form-notch-leading" style="width: 9px"></div>
                  <div class="form-notch-middle" style="width: 64px"></div>
                  <div class="form-notch-trailing"></div>
                </div>
              </div>

              <div v-show="state" class="text-center mt-4 pt-2 mb-5">
                <button
                  type="button"
                  @click="login()"
                  class="btn btn-custom btn-lg"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Ulogiraj se
                </button>
              </div>

              <div v-show="!state" class="text-center mt-4 pt-2 mb-5">
                <button
                  type="button"
                  @click="signup()"
                  class="btn btn-custom btn-lg"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Registriraj se
                </button>
              </div>
            </form>
            <div v-show="errorState" class="alert alert-danger" role="alert">
              <b>
                <p>Greška: {{ errorMessage }}</p>
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      state: true,
      errorMessage: "",
      errorState: false,
    };
  },
  methods: {
    checkPass() {
      if (!(this.password === this.passwordRepeat) && !this.state) {
        this.errorState = true;
        this.errorMessage = "Šifre se ne podudaraju";
      } else this.errorState = false;
    },
    stateLS() {
      if (this.state) return this.login();
      else return this.signup();
    },
    async login() {
      if (this.email && this.password) {
        console.log("success: ", success);
        if (success) {
          this.$router.go();
        } else {
          this.errorState = true;
          this.errorMessage = "Neuspiješno ulogiranje, probajte ponovno!";
        }
      } else {
        this.errorState = true;
        this.errorMessage = "Ne smijete ostaviti prazna polja!";
      }
    },
    async signup() {
      if (this.email && this.name && this.password) {
        if (success) {
          this.login();
        } else {
          this.errorState = true;
          this.errorMessage = "Krivi podaci, ili je zauzet email!";
        }
      } else {
        this.errorState = true;
        this.errorMessage = "Ne smijete ostaviti prazna polja!";
      }
    },
    toggleLogin() {
      this.state = true;
      this.errorState = false;
    },
    toggleSignup() {
      this.state = false;
      this.errorState = false;
      this.checkPass();
    },
  },
};
</script>
