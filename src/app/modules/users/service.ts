import { PrismaClient, RoleEnumType } from "@prisma/client";
import { comparePasswords, hashPassword } from "../../../helpers/hashPass";
import { JwtHelpers } from "../../../helpers/jwtHelpes";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";


const prisma = new PrismaClient()

const loginService=async(payload:any)=>{
    const isExist = await prisma.user.findFirst({
        where: {
            email: payload.email
        }
    })

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND,'This user not found')
    }

    if (payload.password === undefined) {
        throw new ApiError(httpStatus.NO_CONTENT,'password not given')
    }

    if (isExist !== null &&
        payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {


        //create access token, refresh token 
        const data = { id: isExist.id, role:isExist.role, email: isExist.email as string }
        const accessToken = JwtHelpers.createToken(data,config.jwt.accessToken,config.jwt.accessTokenExpiresIn as string)
        return {
            accessToken
        }
        // const refreshToken = await createRefreshToken(data)

    } else {
        throw new ApiError(httpStatus.CONFLICT,'Password not match or invalid')
    }
}

const registerService=async(payload:any)=>{
    let role = null

    const isExist = await prisma.user.findFirst({
        where:{
            email:payload.email
        }
    })

    if(isExist){
        throw new ApiError(httpStatus.CONFLICT,'This user already exist in our database');
    }

    const Hashed = await hashPassword(payload.password)
    payload.password = Hashed 

    if(payload.role != undefined || payload.role != null){
        role = payload.role
    }else {
        role = RoleEnumType.USER
    }

    const response = await prisma.user.create({
        data: payload
    })

    if(!response){
        throw new ApiError(400,'Registration falied')
    } 

    const data = { id: response.id, role:role, email: response.email as string }
    // const accessToken = await signJwt(data)
    const accessToken =  JwtHelpers.createToken(data,config.jwt.accessToken,config.jwt.accessTokenExpiresIn as string)
    return {
        accessToken
    }
}




export const AuthServices = {
    loginService,
    registerService
}