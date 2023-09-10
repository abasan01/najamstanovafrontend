import axios from "axios"
import $router from "@/router"


/* Definicija za backend */
let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 70000
})

/* Token koji se šalje na backend */
Service.interceptors.request.use((request) => {
  try {
    if (request.headers.authRequired) /* Provjera jel uopće potrebno autorizirati prije nego što se šalje req */ {
      const token = users.getToken()
      console.log("token: ", token)
      if (token) {
        request.headers['Authorization'] = 'Bearer ' + users.getToken();
      } else {
        throw new Error("Token is missing"); /* Ukoliko fali token prekidamo sa requestom na backend */
      }
    }
  } catch (e) {
    console.error(e);
  }
  return request;
});

/* Ukoliko dobijemo error vezano uz token */
Service.interceptors.response.use((response) => response, async (err) => {
  console.log(err.response.status)
  /* Ukoliko ne valja token */
  if (err.response.status == 401) {
    return
  }
  /* Ukoliko je istekao token  */
  if (err.response.status == 403) {
    console.log("logout")
    await users.logoutUser();
    $router.go()
    return
  }
})

/* Za dobivanje oglasa */
const ads = {
  async getAds(terms) {
    const response = await Service.get("/ads", {
      params: terms
    })
    return response.data
  },
  /* Za dobivanje specifičnog oglasa */
  async getAdsDetail(id) {
    try {
      const response = await Service.get(`/ads/${id}`)
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  /* Za dodavanje oglasa */
  async postAds(body) {
    try {
      console.log("postAds")
      const response = await Service.post(`/upload`, body, {
        headers: {
          authRequired: "true" /* Pokazuje da je potrebna autorizacija za ovaj request */
        }
      });
      return response.data
    } catch (e) {
      console.error(e.message)
      $router.go()
      return false
    }
  },
  /* Za updateanje oglasa */
  async updateAds(body, id) {
    try {
      console.log("postAds")
      const response = await Service.patch(`/upload/${id}`, body, {
        headers: {
          authRequired: "true" /* Pokazuje da je potrebna autorizacija za ovaj request */
        }
      });
      return response.data
    } catch (e) {
      console.error(e.message)
      $router.go()
      return false
    }
  },
  async deleteAds(id) {
    try {
      console.log("postAds")
      const response = await Service.delete(`/upload/${id}`, {
        headers: {
          authRequired: "true" /* Pokazuje da je potrebna autorizacija za ovaj request */
        }
      });
      return response.data
    } catch (e) {
      console.error(e.message)
      $router.go()
      return false
    }
  }
}

/* Korisnik */
const users = {
  /* Dodavanje novog korisnika, odnosno signup */
  async setUser(body) {
    try {
      const response = await Service.post("/signup", body)
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  /* Login za usera, patch pošto mijenjamo status korisnika */
  async loginUser(body) {
    try {
      const response = await Service.patch("/login", body)
      localStorage.setItem("user", JSON.stringify(response.data))
      return true
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  /* Logout za usera, patch pošto mijenjamo status korisnika */
  async logoutUser() {
    try {
      const user = JSON.parse(this.getUser());
      console.log(user)
      const response = await Service.patch("/logout", user)

      if (response) localStorage.removeItem("user")
      console.log("response: ", response)
      return
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  /* Za dobivanje tokena i emaila radi preglednosti */
  getUser() {
    return localStorage.getItem("user")
  },
  /* Koristimo kada šaljemo header, u funkciji je čisto radi preglednosti */
  getToken() {
    const user = JSON.parse(this.getUser())
    if (user && user.token) {
      return user.token
    } else {
      return false
    }
  },
  /* Provjera ako je korisniku istekla autorizacija */
  async getAuth() {
    await Service.get("/auth", {
      headers: {
        authRequired: "true" /* Pokazuje da je potrebna autorizacija za ovaj request */
      }
    })
    return
  }
}

/* Poruke */
const messages = {
  async addMessage(body) {
    try {
      const response = await Service.post("/messages", body, {
        headers: {
          authRequired: "true"
        }
      })
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  async getConversations() {
    try {
      const response = await Service.get("/conversations", {
        headers: {
          authRequired: "true"
        }
      })
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  async addConversations(body) {
    try {
      const response = await Service.patch("/conversations", body, {
        headers: {
          authRequired: "true"
        }
      })
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  },
  async getMessages(params) {
    try {
      const response = await Service.get("/messages", {
        params: {
          from: params.from,
          to: params.to
        },
        headers: {
          authRequired: "true"
        }
      })
      return response.data
    } catch (e) {
      console.error(e.message)
      return false
    }
  }
}

const host = "http://localhost:3000"

export {
  ads,
  users,
  messages,
  host
}