import axios from "axios";
const api = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_API}`,
    withCredentials:process.env.STAGE === "production" ? true : false
})
export default api