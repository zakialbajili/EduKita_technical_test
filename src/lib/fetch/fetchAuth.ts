import api from "@/axios/config"
import { loginPayload } from "../types/authTypes"

class authModule {
    fetchRegistUser = async(payload:FormData) => {
        const {data} = await api.post('/auth/register', payload)
        return data
    }
    fetchLoginUser = async(payload:loginPayload) => {
        const {data} = await api.post('/auth/login', payload)
        return data
    }
}
const fetchAuth = new authModule()
export default fetchAuth