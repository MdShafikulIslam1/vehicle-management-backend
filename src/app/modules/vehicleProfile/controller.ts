import { RequestHandler } from "express"
import { vehicleProfileService } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


const createVehicleController:RequestHandler = async (req,res,next)=>{
try{
    const result = await vehicleProfileService.createVehicleService(req.body)
   return  sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Vehicle added successful',
        data:result
    })
}catch(err){
return next(err)
}
}

const getAllVehicleController:RequestHandler = async (req,res,next)=>{
    try{
  const { page = 1, size = 10, sortBy = "id", sortOrder = "asc", make, model, vehicleName, search } = req.query;
 // Define filter conditions
  const filters: any = {
    AND: [],
  };
  if (make) {
    filters.AND.push({ make: { contains: make.toString() } });
  }

  if (model) {
    filters.AND.push({ model: { contains: model.toString() } });
  }

  // Corrected filtering condition for vehicleName
if (vehicleName) {
  filters.AND.push({ vehicleName: { contains: vehicleName.toString() } });
}

  if (search) {
    filters.AND.push({
      OR: [{ vehicleName: { contains: search.toString(), mode: "insensitive" } }],
    });
  }

  const skip = (Number(page) - 1) * Number(size);
  const total = await prisma.vehicleProfile.count({
    where: filters,
  });

  const totalPage = Math.ceil(total / Number(size));

  const result = await prisma.vehicleProfile.findMany({
    where: filters,
    skip,
    take: Number(size),
    orderBy: {
      [sortBy as string]: sortOrder,
    },
  });
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Books fetched successfully",
    meta: {
      page: Number(page),
      size: Number(size),
      total,
      totalPage,
    },
    data: result,
  });
    
    }catch(err){
      return  next(err)
    }

}

const deleteVehicleController: RequestHandler = async (req, res,next) => {
  try {
    // const isAdmin = req?.user?.role === "admin" || "super-admin";
    // // console.log(isAdmin, "ata req");
    // if (!isAdmin) {
    //   res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id =  req?.params?.id;
    const result = await vehicleProfileService.DeletevehicleProfileService(id);
    return  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Vehicle deleted successful',
      data:result
  })
}catch(err){
return next(err)
}
};
const updateVehicleController: RequestHandler = async (req,res,next
) => {
  try {
    // const isAdmin = req?.user?.role === "admin";
    // if (!isAdmin) {
    //   return res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id =  req?.params?.id;
    const data = req.body;
    const result = await vehicleProfileService.updateVehicleProfileService(data, id);
    return  sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Vehicle uodated successful',
      data:result
  })
}catch(err){
return next(err)
}
};


export const vehicleController = {
    createVehicleController,
    getAllVehicleController,
    deleteVehicleController,
    updateVehicleController
}



