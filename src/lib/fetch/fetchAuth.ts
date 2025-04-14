import api from "@/axios/config"
import { loginPayload, registerPayload } from "../types/authTypes"

class authModule {
    fetchRegistUser = async(payload:registerPayload) => {
        const {data} = await api.post('/users', payload)
        return data
    }
    fetchLoginUser = async(payload:loginPayload) => {
        const {data} = await api.post('/auth/login', payload)
        return data
    }
}
const fetchAuth = new authModule()
export default fetchAuth