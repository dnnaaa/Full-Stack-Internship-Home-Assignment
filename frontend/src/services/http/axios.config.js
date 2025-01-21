import axios from "axios"
import { handleApiError } from "@/utils/errorHandler"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090/api",
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const apiError = await handleApiError(error)
    return Promise.reject(apiError)
  }
)

export default instance