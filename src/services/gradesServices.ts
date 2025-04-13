import { payloadSubmitGrades } from "../types/gradesTypes"
import db from "../utils/config/db"
import { ValidationError } from "../utils/errors/customErrors"

class GradesServices {
    createDataGrades = async(req:payloadSubmitGrades) => {
        try {
            const { grades, assignmentId, feedback} = req
            const findSenderAssignment = await db.authAssignment.findFirst({
                where:{
                    id:assignmentId
                }
            })
            if(!findSenderAssignment){
                throw new Error("Assignment not found");
            }
            const result  = await db.$transaction([
                db.resultAssignment.create({
                    data:{
                        iduser:findSenderAssignment.iduser,
                        grades:grades,
                        idauthassignment:assignmentId,
                        feedback:feedback,
                    },
                }),
                db.authAssignment.update({
                    where:{
                        id:assignmentId
                    },
                    data:{
                        status:"DONE"
                    }
                })
            ])
            if(result instanceof Error){
                throw new Error
            }
            return result[0]
        } catch (error) {
            console.error("Error in GradesServices Module createDataGrades Method", error)
            throw error
        }
    }
    getListGradesStudent = async(studentId:number) => {
        try {
            if (typeof studentId !== "number" || isNaN(studentId)) {
                throw new ValidationError("Invalid schema when request services", "type studentId must number");
            }
            const result = await db.resultAssignment.findMany({
                where:{
                    iduser:studentId
                },
                include:{
                    authAssignment:true
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