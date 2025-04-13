import express from "express"
import assignmentsController from "../controllers/assignmentsController"
const assignmentsRoutes = express.Router()

assignmentsRoutes.get('/assignments', assignmentsController.listAssignmentSubmitted)
assignmentsRoutes.post('/assignments', assignmentsController.submitAssignment)
export default assignmentsRoutes