import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"


const loginController = async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const response = await AuthServices.loginService(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Login successful',
        data:response
    })
   } catch (error) {
    next(error)
   }
}

const registerController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.registerService(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Registration successful',
            data:response
        })
    } catch (error) {
        next(error)
    }
}

export const authControllers = {
    loginController,
    registerController
}