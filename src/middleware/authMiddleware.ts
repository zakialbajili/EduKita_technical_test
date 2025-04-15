import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helpers/response/webResponse";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../utils/config/db";
import { AuthenticationError } from "../utils/errors/customErrors";
import { credentialsAccount } from "../types/userTypes";

dotenv.config();

interface userReq extends Request {
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

class authMiddleware {
    onlyTeacher = async (req: userReq, res: Response, next: NextFunction):Promise<any> => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json(errorResponse("Access denied. No token provided.", 403));
            }

            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                return res
                    .status(500)
                    .json(errorResponse("Secret key not configured.", 500));
            }

            const decoded = jwt.verify(token, secretKey);
            const payloadToken = decoded as credentialsAccount;
            const account = await db.user.findUnique({
                where: { email: payloadToken.email },
                include: { userProfile: true },
            });

            if (!account) {
                return res.status(404).json(errorResponse("Account not found.", 404));
            }

            if (payloadToken.role === "TEACHER" && account.userProfile) {
                (req as userReq).user = {
                    id: account.id,
                    email: account.email,
                    name: account.userProfile.name,
                    role: account.userProfile.role,
                };
                return next(); // Cukup memanggil next() tanpa mengembalikan response
            } else {
                throw new AuthenticationError("You do not have permission to access this feature");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            return next(error); // Panggil next dengan error jika ada masalah
        }
    };

    onlyStudent = async (req: userReq, res: Response, next: NextFunction):Promise<any> => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json(errorResponse("Access denied. No token provided.", 403));
            }

            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                return res
                    .status(500)
                    .json(errorResponse("Secret key not configured.", 500));
            }

            const decoded = jwt.verify(token, secretKey);
            const payloadToken = decoded as credentialsAccount;
            const account = await db.user.findUnique({
                where: { email: payloadToken.email },
                include: { userProfile: true },
            });

            if (!account) {
                return res.status(404).json(errorResponse("Account not found.", 404));
            }

            if (payloadToken.role === "STUDENT" && account.userProfile) {
                (req as userReq).user = {
                    id: account.id,
                    email: account.email,
                    name: account.userProfile.name,
                    role: account.userProfile.role,
                };
                return next(); // Cukup memanggil next() tanpa mengembalikan response
            } else {
                throw new AuthenticationError("You do not have permission to access this feature");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            return next(error); // Panggil next dengan error jika ada masalah
        }
    };
}
export default new authMiddleware();