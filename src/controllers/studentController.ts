import { Request, Response } from "express";

class studentController {
    postAssignment = async(req:Request, res:Response) => {
        try {
            // const {email, password} = await req.body
        } catch (error) {
            console.log("Student Controller Module postAssignment error:" , error)
            res.status(500).json({message:"Internal server error"})
        }
    }
    getGradesAndFeedback = async(req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log("Student Controller Module getGradesAndFeedback error:" , error)
            res.status(500).json({message:"Internal server error"})
        }
    }
}
export default new studentController()