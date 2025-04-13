import express from "express"
import assignmentsController from "../controllers/assignmentsController"
const assignmentsRoutes = express.Router()

assignmentsRoutes.get('/assignments', assignmentsController.listAssignmentSubmitted)
export default assignmentsRoutes