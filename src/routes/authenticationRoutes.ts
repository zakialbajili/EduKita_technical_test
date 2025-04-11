import express from "express"
import authController from "../controllers/authController"
const authRoutes = express.Router()

authRoutes.post("/users", authController.register);
authRoutes.post("/auth/login", authController.login)

export default authRoutes