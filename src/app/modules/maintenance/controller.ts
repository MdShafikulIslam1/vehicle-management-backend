import { RequestHandler } from "express"
import { maintenanceService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { PrismaClient } from "@prisma/client"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"


const prisma = new PrismaClient()


const createController: RequestHandler = async (req, res, next) => {
  try {
    const response = await maintenanceService.createService(req.body)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'New maintenance created successfully',
      data:response
  })
  } catch (error) {
    next(error)
  }
}

const getAllController: RequestHandler = async (req, res, next) => {

try {
  const filterOptions = pick(req.query, ['task','lastDone','nextDue'])
  const paginationOptions = pick(req.query, paginationOptionFields)
  const response = await maintenanceService.getAllService(paginationOptions,filterOptions)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Turfs retrieved successfully",
    data: response,
  });
} catch (error) {
  next(error)
}
}

const singleController:RequestHandler=async(req, res, next)=>{
  try {
    const response = await maintenanceService.singleService(req.params.id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Single maintenance retrieve successfully',
      data:response
  })
  } catch (error) {
    next(error)
  }
}

const deleteController: RequestHandler = async (req, res, next) => {
 try {
    const response = await maintenanceService.DeleteService(req.params.id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Maintenance info deleted successfully',
      data:response
  })
 } catch (error) {
  next(error)
 }

};

const updateController: RequestHandler = async (req, res, next) => {
  try {
    const response = await maintenanceService.updateService(req.body,req.params.id)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Maintenance info updated successfully',
      data:response
  })
 } catch (error) {
  next(error)
 }
};


export const maintenanceController = {
  createController,
  getAllController,
  singleController,
  deleteController,
  updateController
}



