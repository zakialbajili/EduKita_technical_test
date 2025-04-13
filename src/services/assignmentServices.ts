import { subjectFilter, submitAssignment } from "../types/assignmentTypes"
import db from "../utils/config/db"
class AssignmentServices {
    // listAssignment = async() => {}
    submitAssignment = async(req:submitAssignment) => {
        try {
            const {subject, content, title, studentId} = req
            // const result = await db.authAssignment.create({
            //     data:{
            //     }
            // })
        } catch (error) {
            console.error("Error in AssignmentServices Module filteredAssignmentSubmitted Method", error)
        }
    }
    filteredAssignmentSubmitted = async(req:subjectFilter) => {
        try {
            //get value query from request
            const filtered = req
            //find assignment submitted that subject match with filter
            const results = await db.authAssignment.findMany({
                where:{
                    assignment:{
                        subject:filtered
                    }
                },
                include:{
                    assignment:true
                },
                orderBy:{
                    created_at:"desc"
                }
            })
            //throw error if error when find data
            if(results instanceof Error){
                throw new Error
            }
            return results
        } catch (error) {
            console.error("Error in AssignmentServices Module filteredAssignmentSubmitted Method", error)
        }
    }
    listAssignmentSubmitted = async() => {
        try {
            // get list assignment submitted
            const results = await db.authAssignment.findMany({
                orderBy:{
                    created_at:"desc"
                }
            })
            //throw error if error when find data
            if(results instanceof Error){
                throw new Error
            }
            return results
        } catch (error) {
            console.error("Error in AssignmentServices Module listAssignmentSubmitted Method", error)
        }
    }
    detailAssignmentSubmitted = async(studentId:number, assignmentId:number) => {
        try {
            //find assignment submitted by id student and id assignment
            const result = await db.authAssignment.findFirst({
                where:{
                    iduser:studentId,
                    idassignment:assignmentId
                },
                include:{
                    assignment:true
                }
            })
            //throw error if error when find data
            if(result instanceof Error){
                throw new Error
            }
            return result
        } catch (error) {
            console.error("Error in AssignmentServices Module detailAssignmentSubmitted Method", error)
        }
    }
}
export default new AssignmentServices()