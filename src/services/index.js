import axios from "axios"
import $router from "@/router"


/* Definicija za backend */
let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 70000
})

/* Za dobivanje oglasa */
const ads = {
  async getAds(terms) {
    const response = await Service.get("/ads", {
      params: terms
    })
    return response.data
  },
  async getAdsDetail(id) {
    const response = await Service.get(`/ads/${id}`)
    return response.data
  }
}

export {
  ads
}