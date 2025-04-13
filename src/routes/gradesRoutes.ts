import express from "express"
import gradesController from "../controllers/gradesController";
const gradesRoutes = express.Router()

gradesRoutes.post("/grades", gradesController.submitGradeAssignment);
gradesRoutes.get("/grades/:studentId", gradesController.listGradesStudent);

export default gradesRoutes