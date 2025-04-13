import db from "../utils/config/db"
import dotenv from "dotenv"
import { Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthenticationError, ValidationError } from "../utils/errors/customErrors"
import { AccountType, loginPayload, registerPayload } from "../types/userTypes"

dotenv.config()

class AuthServices {
  private tokenExpiry: { access: jwt.SignOptions["expiresIn"]; refresh: jwt.SignOptions["expiresIn"] }
  private jwtSecretKey: jwt.Secret

  constructor() {
    this.tokenExpiry = {
      access: "15m",
      refresh: "7d",
    }

    const jwtSecret = process.env.SECRET_KEY
    if (!jwtSecret) {
      throw new Error("SECRET_KEY is not defined in .env")
    }

    this.jwtSecretKey = jwtSecret
  }

  #generateAccessToken = (account: AccountType) => {
    //payload for create access token
    const payload = {
      name: account.name,
      email: account.email,
      role: account.role,
    }
    //create access token
    const token = jwt.sign(payload, this.jwtSecretKey, {
      expiresIn: this.tokenExpiry.access,
    })
    return token
  }

  #generateRefreshToken = (account:AccountType) => {
    //payload for create access token
    const payload = {
      name: account.name,
      email: account.email,
      role: account.role,
    }
    //create access token
    const token = jwt.sign(payload, this.jwtSecretKey, {
      expiresIn: this.tokenExpiry.refresh,
    })
    return token
  }

  loginUsers = async (req: loginPayload, res: Response) => {
    try {
      //get properti in payload
      const { email, password } = req
      //confirmation user available in database
      const isUser = await db.user.findUnique({ where: { email } })
      if (!isUser) {
        throw new AuthenticationError("User not found")
      }
      //confirmation password payload and password db same
      const comparePassword = bcrypt.compareSync(password, isUser.password)
      if (!comparePassword) {
        throw new AuthenticationError("Password not match")
      }
      //create access token
      const accessToken = this.#generateAccessToken(isUser)
      //create refresh token
      const refreshToken = this.#generateRefreshToken(isUser)
      //get name and role from data isUser for data API purpose 
      const {id, name, role} = isUser
      return{id, name, email, role, accessToken, refreshToken}
    } catch (error) {
      console.error("Error in AuthServices Module loginUsers Method", error)
      // return error
      if(error instanceof AuthenticationError){
        throw error
      } else {
        throw new AuthenticationError("Terjadi kesalahan saat proses login. Silakan coba lagi!")
      }
    }
  }

  registerUser = async(req:registerPayload) => {
    try {
      //get properti in payload
      const {name, email, password, role} = req
      //hashinf password
      const hashPassword = bcrypt.hashSync(password, 10)
      // create user
      const createUser = await db.user.create({
        data:{name, email, password:hashPassword, role}
      })
      if(!createUser){
        throw new ValidationError("Data yang dikirimkan belum sesuai", "BAD_REQUEST")
      }
      return {
        name:createUser.name,
        email:createUser.email,
        role:createUser.role,
      }
    } catch (error) {
      console.error("Error in AuthServices Module registerUsers Method", error)
    }
  }
}

export default new AuthServices()
