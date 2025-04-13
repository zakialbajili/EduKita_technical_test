import { submitAssignment } from "../types/assignmentTypes"
import { payloadSubmitGrades } from "../types/gradesTypes"
import db from "../utils/config/db"
import { ValidationError } from "../utils/errors/customErrors"

class GradesServices {
    createDataGrades = async(req:payloadSubmitGrades) => {
        try {
            const {feedback, grade, teacherId, assignmentId} = req
            console.log(teacherId)
            const findSender = await db.assignment.findFirst({
                where:{id:assignmentId},
                select:{iduser:true}
            })
            if (!findSender || findSender.iduser === null) {
                throw new Error("Assignment sender not found or iduser is null");
            }
            const result = await db.assignment.update({
                where:{id:assignmentId},
                data:{
                    grade,feedback,
                    iduser:findSender.iduser
                }
            })
            if(result instanceof Error){
                throw new Error
            }
            return result
        } catch (error) {
            console.error("Error in AssignmentServices Module createDataGrades Method", error)
        }
    }
    getListGradesStudent = async(studentId:number) => {
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
export default new GradesServices()