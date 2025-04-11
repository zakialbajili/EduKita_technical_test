import { Request, Response } from "express";
import db from "../utils/config/db";

class studentServices {
    postAssignment = async(req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log("Student Controller Module getGradesAndFeedback error:" , error)
            return error
        }
    }
}
export default new studentServices()