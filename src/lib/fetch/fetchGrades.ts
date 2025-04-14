import api from "@/axios/config"
import { payloadGrades } from "../types/gradesTypes"

class gradementModule {
    submitGrades = async(payload:payloadGrades) => {
        const {data} = await api.post('/grades', payload)
        return data
    }
    // fetchLoginUser = async(payload:loginPayload) => {
    //     const {data} = await api.post('/auth/login', payload)
    //     return data
    // }
}
const fetchGrades = new gradementModule()
export default fetchGrades