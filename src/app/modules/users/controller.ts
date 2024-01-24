import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./service"


const loginController = async(req:Request,res:Response,next:NextFunction)=>{
    const response = await AuthServices.loginService(req.body)
}

const registerController = async(req:Request,res:Response,next:NextFunction)=>{
    const response = await AuthServices.registerService(req.body)
}

export const authControllers = {
    loginController,
    registerController
}