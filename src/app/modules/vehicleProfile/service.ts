import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()

const createVehicleService =async (payload:any)=>{
        const result = await prisma.vehicleProfile.create({
            data: payload
        })
     return result
}

const getAllVehicleService = async (payload:any)=>{
    const {filters,skip,size,sortBy,sortOrder}=payload
    const result = await prisma.vehicleProfile.findMany({
        where:filters,
        skip,
        take:Number(size),
        orderBy:{
            [sortBy]:sortOrder
        }
    })
    return result
}


const updateVehicleProfileService = async (data: any, id: string) => {
    const result = await prisma.vehicleProfile.update({
      where: {
        id: id,
      },
      data,
    });
    return result;
  };

  const DeletevehicleProfileService = async (id: string) => {
    const result = await prisma.vehicleProfile.delete({
      where: {
        id,
      },
    });
    return result;
  };
 


export const vehicleProfileService ={
    createVehicleService,
    getAllVehicleService,
    updateVehicleProfileService,
    DeletevehicleProfileService
}