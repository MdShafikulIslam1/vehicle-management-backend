/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Driver } from '@prisma/client';

import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IDriverFilterRequest } from './driver.interface';
import {
  driverRelationalFields,
  driverRelationalFieldsMapper,
  driverSearchableFields,
} from './driver.constant';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (data: Driver): Promise<Driver> => {
  const { driverId, vehicleId } = data;

  const isExistDriver = await prisma.user.findUnique({
    where: {
      id: driverId,
    },
  });

  if (!isExistDriver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'invalid driver id');
  }
  const isExistVehicle = await prisma.vehicleProfile.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!isExistVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'invalid vehicle id');
  }

  const createDriverResult = await prisma.$transaction(async transaction => {
    const result = await transaction.driver.create({
      data,
      include: {
        driver: true,
        vehicle: true,
      },
    });

    await transaction.user.update({
      where: {
        id: driverId,
      },
      data: {
        role: 'DRIVER',
      },
    });

    return result;
  });

  return createDriverResult;
};

const getAllFromDB = async (
  filters: IDriverFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Driver[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: driverSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (driverRelationalFields.includes(key)) {
          return {
            [driverRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.DriverWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.driver.findMany({
    include: {
      vehicle: true,
      driver: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.driver.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Driver | null> => {
  const result = await prisma.driver.findUnique({
    where: {
      driverId: id,
    },
    include: {
      vehicle: true,
      driver: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Driver>
): Promise<Driver> => {
  const result = await prisma.driver.update({
    where: {
      driverId: id,
    },
    data: payload,
    include: {
      driver: true,
      vehicle: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Driver> => {
  const result = await prisma.driver.delete({
    where: {
      driverId: id,
    },
    include: {
      driver: true,
      vehicle: true,
    },
  });
  return result;
};

export const DriverService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
