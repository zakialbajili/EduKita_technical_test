import api from "@/axios/config"
import { payloadGrades } from "../types/gradesTypes"

class gradesModule {
    submitGrades = async(payload:payloadGrades) => {
        const {data} = await api.post('/grades', payload)
        return data
    }
}
const fetchGrades = new gradesModule()
export default fetchGrades