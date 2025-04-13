import { Request, Response } from "express"
import handleError from "../helpers/errors/handleErrors"
import gradesServices from "../services/gradesServices"
import { successResponse } from "../helpers/response/webResponse"

class gradesController {
    submitGradeAssignment = async(req: Request, res: Response) => {
        try {
            const {teacherId, assignmentId, grade, feedback} = await req.body
            const result = await gradesServices.createDataGrades({teacherId, assignmentId, grade, feedback})
            res.status(201).json(
                successResponse("Submit grades assignment student success", 201, result)
            )
        } catch (error) {
            if ( error instanceof Error ) {
                handleError(error, res)
            }
        }
    }
    listGradesStudent = async(req:Request, res:Response) => {
        try {
            const {studentId} = req.params
            const result = await gradesServices.getListGradesStudent(Number(studentId))
            res.status(201).json(
                successResponse("List grades assignment student success", 201, result)
            )
        } catch (error) {
            if ( error instanceof Error ) {
                handleError(error, res)
            }
        }
    }
}
export default new gradesController()