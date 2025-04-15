import { payloadSubmitGrades } from "../types/gradesTypes"
import db from "../utils/config/db"
import { ValidationError } from "../utils/errors/customErrors"

class GradesServices {
    createDataGrades = async(req:payloadSubmitGrades) => {
        try {
            const {feedback, grade, teacherId, assignmentId} = req
            const isTeacher = await db.user.findFirst({
                where:{id:teacherId}
            })
            if(!isTeacher){
                throw new ValidationError("Not any teacher with this id", "Id teacher not match with db")
            }
            const findSender = await db.assignment.findFirst({
                where:{id:Number(assignmentId)},
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
                    iduser:studentId,
                    grade:{not:null}
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