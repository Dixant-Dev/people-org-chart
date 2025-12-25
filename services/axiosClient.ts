import axios from "axios"

const axiosClient = axios.create({
  baseURL: "https://worksync.global/api",
})

export default axiosClient
