import { Request, Response } from "express"
import assignmentServices from "../services/assignmentServices"
import { errorResponse, successResponse } from "../helpers/response/webResponse"
import handleError from "../helpers/errors/handleErrors"
enum subjectFilter {
    ENGLISH = "ENGLISH",
    MATEMATHIC = "MATEMATHIC"
}
class assignmentsController {
    listAssignmentSubmitted = async (req: Request, res: Response) => {
        try {
            const { subject } = req.query
            if (subject === "ENGLISH" || subject === "MATEMATHIC") {
                const result = await assignmentServices.filteredAssignmentSubmitted(subject as subjectFilter)
                res.status(200).json(
                    successResponse("Get list filtered assignment submitted succcess", 200, result)
                )
            }
            else if (subject === undefined) {
                const result = await assignmentServices.listAssignmentSubmitted()
                res.status(200).json(
                    successResponse("Get list assignment submitted succcess", 200, result)
                )
            }
            else{
                res.status(400).json(errorResponse("Subject Filter not have permission", 400))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleError(error, res)
            }
        }
    }
    detailAssignmentSubmitted = async (req:Request, res:Response) => {
        try {
            const {student, assignment} = req.query
            const result  = await assignmentServices.detailAssignmentSubmitted(Number(student), Number(assignment))
            if(result) {
                res.status(200).json(
                    successResponse("Get detail assignment submitted succcess", 200, result)
                )
            }
        } catch (error) {
            if (error instanceof Error) {
                handleError(error, res)
            }
        }
    }
}
export default new assignmentsController()