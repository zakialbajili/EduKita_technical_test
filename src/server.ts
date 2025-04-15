import express, {Request, Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import authRoutes from "./routes/authenticationRoutes"
import assignmentsRoutes from "./routes/assignmentsRoutes"
import gradesRoutes from "./routes/gradesRoutes"
const app = express()
dotenv.config()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded())
app.use(authRoutes)
app.use(assignmentsRoutes)
app.use(gradesRoutes)
app.use('/', async (req:Request, res:Response) => {
    res.status(200).json({message:"Welcome to Edukita Backend Services"})
})
app.listen(port, ()=>{console.log(`Your service running on http://localhost:${port}`)})