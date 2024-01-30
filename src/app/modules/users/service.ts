import { Prisma, PrismaClient, RoleEnumType, User } from "@prisma/client";
import { comparePasswords, hashPassword } from "../../../helpers/hashPass";
import { JwtHelpers } from "../../../helpers/jwtHelpes";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IUserResponse, user_fields_constant } from "./interface";


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

const getAllService = async (
    paginatinOptions: IPaginationOptions,
    filterOptions: IFilters
  ): Promise<IGenericResponse<IUserResponse[]>> => {
    const { searchTerm, ...filterData } = filterOptions;
    const { limit, page, skip } =
      paginationHelpers.calculatePagination(paginatinOptions);
  
    const andConditions = [];
  
    //searching code
    if (searchTerm) {
      andConditions.push({
        OR: user_fields_constant.map(field => {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          };
        })
      });
    }
  
    //filtering code
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => ({
          [key]: {
            equals: (filterData as any)[key]
          }
        }))
      });
    }

    const whereCondition: Prisma.UserWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy:
        paginatinOptions.sortBy && paginatinOptions.sortOrder
          ? {
              [paginatinOptions.sortBy]: paginatinOptions.sortOrder
            }
          : { createAt: 'asc' },
      select: {
        id: true,
        name:true,
        email:true,
        address:true,
        location:true,
        avatar:true,
        phone:true,
        role:true
      }
    });
  
    const total = await prisma.user.count();
  
    return {
      meta: {
        limit,
        page,
        total
      },
      data: result
    };
  };






export const AuthServices = {
    loginService,
    registerService,
    getAllService
}