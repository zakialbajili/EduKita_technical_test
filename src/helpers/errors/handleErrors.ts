import { Response } from "express";
import { AuthenticationError, ValidationError } from "../../utils/errors/customErrors";
import { errorResponse } from "../response/webResponse";

export default function handleError (error: Error | AuthenticationError | ValidationError, res:Response) {
    if(error instanceof ValidationError){
        res.status(400).json(
            errorResponse(error.message, 400)
        )
    } else if(error instanceof AuthenticationError){
        let statusCode:number = 403
        res.status(statusCode).json(
            errorResponse(error.message, statusCode)
        )
    } else {
        res.status(500).json(
            errorResponse("Terjadi kesalahan saat pada server, silahkan coba kembali lagi nanti!", 500)
        )
    }
}