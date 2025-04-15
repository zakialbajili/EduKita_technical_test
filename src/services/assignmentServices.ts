import { subjectFilter, submitAssignment } from "../types/assignmentTypes"
import db from "../utils/config/db"
import { ValidationError } from "../utils/errors/customErrors"
class AssignmentServices {
    // listAssignment = async() => {}
    submitAssignment = async(req:submitAssignment) => {
        try {
            const {subject, content, title, studentId} = req
            const result = await db.assignment.create({
                data:{
                    subject:subject,
                    content,
                    title,
                    iduser:studentId
                }
            })
            if(result instanceof Error){
                throw new Error
            }
            return result
        } catch (error) {
            console.error("Error in AssignmentServices Module filteredAssignmentSubmitted Method", error)
        }
    }
    filteredAssignmentSubmitted = async(req:subjectFilter) => {
        try {
            //get value query from request
            const filtered = req
            //find assignment submitted that subject match with filter
            const results = await db.assignment.findMany({
                where:{
                        subject:filtered
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
            const results = await db.assignment.findMany({
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
            const result = await db.assignment.findFirst({
                where:{
                    id:assignmentId,
                    iduser:studentId,
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
    listAssignmentbyId = async(studentId:number) => {
            try {
                if (typeof studentId !== "number" || isNaN(studentId)) {
                    throw new ValidationError("Invalid schema when request services", "type studentId must number");
                }
                const result = await db.assignment.findMany({
                    where:{
                        iduser:studentId
                    },
                    orderBy:{
                        updated_at:"desc"
                    }
                })
                if(result instanceof Error){
                    throw new Error
                }
                return result
            } catch (error) {
                console.error("Error in GradesServices Module getListGradesStudent Method", error)
            }
        }
}
export default new AssignmentServices()