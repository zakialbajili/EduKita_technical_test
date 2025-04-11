import { Request, Response } from "express";
import authService from "../services/authService";
import { successResponse } from "../helpers/response/webResponse";
import handleError from "../helpers/errors/handleErrors";
//import { AuthenticationError, ValidationError } from "../utils/errors/customErrors";


class authController {
    login = async(req:Request, res:Response) => {
        try {
            const {email, password} = await req.body
            const result = await authService.loginUsers({email, password}, res)
            res.status(201).json(
                successResponse("Login success", 201, result)
            )
        } catch (error) {
            // if(error instanceof Error || error instanceof AuthenticationError || error instanceof ValidationError){
            //     console.log("Student Controller Module postAssignment error:" , error)
            //     handleError(error, res)
            // }
            handleError(error as Error, res)
        }
    }
    register = async(req:Request, res:Response) => {
        try {
            // const {name, email, password, role} = await req.body
            const result = await authService.registerUser(req.body)
            res.status(201).json(
                successResponse("Register user success", 201, result)
            )
        } catch (error) {
            handleError(error as Error, res)
        }
    }
}
export default new authController()