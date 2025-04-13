import db from "../utils/config/db"
// type enumFilter = "ENGLISH" | "MATHEMATIC"
enum subjectFilter {
    ENGLISH = "ENGLISH",
    MATEMATHIC = "MATEMATHIC"
}
class AssignmentServices {
    filteredAssignmentSubmitted = async(req:subjectFilter) => {
        try {
            const filtered = req
            const results = await db.authAssignment.findMany({
                where:{
                    assignment:{
                        subject:filtered
                    }
                },
                include:{
                    assignment:true
                },
                orderBy:{
                    created_at:"desc"
                }
            })
            if(results instanceof Error){
                throw new Error
            }
            return results
        } catch (error) {
            console.error("Error in AssignmentServices Module filteredAssignmentSubmitted Method", error)
        }
    }
    listAssignmentSubmitted = async() => {
        try {
            const results = await db.authAssignment.findMany({
                where:{
                    status:"PROGRESS"
                },
                orderBy:{
                    created_at:"desc"
                }
            })
            if(results instanceof Error){
                throw new Error
            }
            return results
        } catch (error) {
            console.error("Error in AssignmentServices Module listAssignmentSubmitted Method", error)
        }
    }
    detailAssignmentSubmitted = async(studentId:number, assignmentId:number) => {
        try {
            const result = await db.authAssignment.findFirst({
                where:{
                    iduser:studentId,
                    idassignment:assignmentId
                },
                include:{
                    assignment:true
                }
            })
            if(result instanceof Error){
                throw new Error
            }
            return result
        } catch (error) {
            console.error("Error in AssignmentServices Module detailAssignmentSubmitted Method", error)
        }
    }
}
export default new AssignmentServices()