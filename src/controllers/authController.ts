import { Request, Response } from "express";
import authService from "../services/authService";
import { successResponse } from "../helpers/response/webResponse";
import handleError from "../helpers/errors/handleErrors";


class authController {
    login = async(req:Request, res:Response) => {
        try {
            const {email, password} = await req.body
            const result = await authService.loginUsers({email, password}, res)
            res.status(201).json(
                successResponse("Login success", 201, result)
            )
        } catch (error) {
            handleError(error as Error, res)
        }
    }
    register = async(req:Request, res:Response) => {
        try {
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