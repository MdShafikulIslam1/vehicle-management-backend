import { Maintenance, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IFilters,
  IPaginationOptions
} from '../../../interfaces/paginationOptions';
import { maintenance_fields_constant } from './interface';

const prisma = new PrismaClient();

const createService = async (payload: any) => {
  const result = await prisma.maintenance.create({
    data: payload
  });
  return result;
};

const getAllService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<Maintenance[]>> => {
  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: maintenance_fields_constant.map(field => {
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

  const whereCondition: Prisma.MaintenanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.maintenance.findMany({
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
      task: true,
      repair_shop_address: true,
      expense: true,
      lastDone: true,
      nextDue: true,
      currentDate: true,
      vehicleProfileId: true,
      createAt: true,
      updatedAt: true,
      vehicleProfile: {
        select: {
          vehicle_make: true,
          photo: true,
          purchase_date: true,
          registeration_date: true,
          color: true,
          registeration_validity: true,
          present_km: true,
          mileage: true,
          price: true,
          fuel_type: true,
          body_type: true,
          model_name: true,
          registration_no: true,
          engine_no: true,
          manufacturing_date: true,
          cubic_capacity: true,
          engine_capacity: true,
          sitting_capacity: true,
          chassis_no: true,
          user: {
            select: {
              name: true,
              email: true,

              phone: true,
              avatar: true,

              address: true,
              location: true
            }
          }
        }
      }
    }
  });

  const total = await prisma.maintenance.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: result
  };
};

const singleService = async (id: string) => {
  const response = await prisma.maintenance.findFirst({
    where: {
      id: id
    }
  });
  return response;
};

const updateService = async (data: any, id: string) => {
  const response = await prisma.maintenance.update({
    where: {
      id: id
    },
    data: data
  });
  return response;
};

const DeleteService = async (id: string) => {
  const response = await prisma.maintenance.delete({
    where: {
      id: id
    }
  });
  return response;
};

export const maintenanceService = {
  createService,
  getAllService,
  singleService,
  updateService,
  DeleteService
};
