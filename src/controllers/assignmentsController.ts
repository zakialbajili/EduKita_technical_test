import { Request, Response } from "express"
import assignmentServices from "../services/assignmentServices"
import { errorResponse, successResponse } from "../helpers/response/webResponse"
import handleError from "../helpers/errors/handleErrors"


class assignmentsController {
    listAssignmentById = async (req: Request, res: Response) => {
        try {
            const { studentId } = req.params
            const result = await assignmentServices.listAssignmentbyId(Number(studentId))
            res.status(201).json(
                successResponse("List assignment by student id success", 201, result)
            )
        } catch (error) {
            if (error instanceof Error) {
                return handleError(error, res)
            }
        }
    }
    submitAssignment = async (req: Request, res: Response) => {
        try {
            const { subject, content, title, studentId } = req.body
            const result = await assignmentServices.submitAssignment({ subject, content, studentId, title })
            if (result instanceof Error) {
                res.status(400).json(errorResponse("Subject Filter not have permission", 400))
            }
            res.status(200).json(
                successResponse("Submit assignment succcess", 201, result)
            )
        } catch (error) {
            if (error instanceof Error) {
                return handleError(error, res)
            }
        }
    }
    listAssignmentSubmitted = async (req: Request, res: Response) => {
        try {
            const { student, assignment } = req.query
            if (student && assignment) {
                const result = await assignmentServices.detailAssignmentSubmitted(Number(student), Number(assignment))
                res.status(200).json(
                    successResponse("Get detail assignment submitted succcess", 200, result)
                )
            }
            const result = await assignmentServices.listAssignmentSubmitted()
            res.status(200).json(
                successResponse("Get list assignment submitted succcess", 200, result)
            )
            // if (subject === "ENGLISH" || subject === "MATEMATHIC") {
            //     const result = await assignmentServices.filteredAssignmentSubmitted(subject as subjectFilter)
            //     res.status(200).json(
            //         successResponse("Get list filtered assignment submitted succcess", 200, result)
            //     )
            // }
            // else if (subject === undefined) {
            //     const result = await assignmentServices.listAssignmentSubmitted()
            //     res.status(200).json(
            //         successResponse("Get list assignment submitted succcess", 200, result)
            //     )
            // }
            // else {
            //     res.status(400).json(errorResponse("Subject Filter not have permission", 400))
            // }
        } catch (error) {
            if (error instanceof Error) {
                return handleError(error, res)
            }
        }
    }
    detailAssignmentSubmitted = async (req: Request, res: Response) => {
        try {
            const { student, assignment } = req.query
            const result = await assignmentServices.detailAssignmentSubmitted(Number(student), Number(assignment))
            if (result) {
                res.status(200).json(
                    successResponse("Get detail assignment submitted succcess", 200, result)
                )
            }
        } catch (error) {
            if (error instanceof Error) {
                return handleError(error, res)
            }
        }
    }
}
export default new assignmentsController()