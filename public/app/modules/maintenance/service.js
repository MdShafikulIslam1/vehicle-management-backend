"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const interface_1 = require("./interface");
const prisma = new client_1.PrismaClient();
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.maintenance.create({
        data: payload
    });
    return result;
});
const getAllService = (paginatinOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginatinOptions);
    const andConditions = [];
    //searching code
    if (searchTerm) {
        andConditions.push({
            OR: interface_1.maintenance_fields_constant.map(field => {
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
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.maintenance.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginatinOptions.sortBy && paginatinOptions.sortOrder
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
    const total = yield prisma.maintenance.count();
    return {
        meta: {
            limit,
            page,
            total
        },
        data: result
    };
});
const singleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.maintenance.findFirst({
        where: {
            id: id
        }
    });
    return response;
});
const updateService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.maintenance.update({
        where: {
            id: id
        },
        data: data
    });
    return response;
});
const DeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.maintenance.delete({
        where: {
            id: id
        }
    });
    return response;
});
exports.maintenanceService = {
    createService,
    getAllService,
    singleService,
    updateService,
    DeleteService
};
