import express from "express"
import assignmentsController from "../controllers/assignmentsController"
import authMiddleware from "../middleware/authMiddleware"
const assignmentsRoutes = express.Router()

assignmentsRoutes.get('/assignments', assignmentsController.listAssignmentSubmitted)
assignmentsRoutes.get('/assignments/send/:studentId', assignmentsController.listAssignmentById)
assignmentsRoutes.post('/assignments', authMiddleware.onlyStudent, assignmentsController.submitAssignment)
export default assignmentsRoutes