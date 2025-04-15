import { credentialUser } from "@/lib/types/authTypes";
import axios from "axios";
const api = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_API}`,
})
api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const rawToken:credentialUser = JSON.parse(token);
        const accessToken = rawToken.results.accessToken
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default api