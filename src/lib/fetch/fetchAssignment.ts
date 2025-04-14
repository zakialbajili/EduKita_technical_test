import api from "@/axios/config"
import { payloadAssignment } from "../types/assignmentTypes"

class assignmentModule {
    sendAssignment = async(payload:payloadAssignment) => {
        const {data} = await api.post('/assignments', payload)
        return data
    }
    // fetchLoginUser = async(payload:loginPayload) => {
    //     const {data} = await api.post('/auth/login', payload)
    //     return data
    // }
}
const fetchAssignment = new assignmentModule()
export default fetchAssignment