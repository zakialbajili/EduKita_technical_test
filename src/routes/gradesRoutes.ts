import express from "express"
import gradesController from "../controllers/gradesController";
import authMiddleware from "../middleware/authMiddleware";
const gradesRoutes = express.Router()

gradesRoutes.post("/grades", authMiddleware.onlyTeacher, gradesController.submitGradeAssignment);
gradesRoutes.get("/grades/:studentId", gradesController.listGradesStudent);

export default gradesRoutes