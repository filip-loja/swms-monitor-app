import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
    $apiManager: AxiosInstance
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios

  const apiManager = axios.create({
    baseURL: process.env.managerApiUrl,
    timeout: 10000
  })
  Vue.prototype.$apiManager = apiManager
})
