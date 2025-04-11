import express, {Request, Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authenticationRoutes"
const app = express()
dotenv.config()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
app.use(authRoutes)
app.use('/', async (req:Request, res:Response) => {
    res.status(200).json({message:"Welcome to Edukita Backend Services"})
})
app.listen(port, ()=>{console.log(`Your service running on http://localhost:${port}`)})