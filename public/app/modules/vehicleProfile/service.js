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
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleProfileService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createVehicleService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.vehicleProfile.create({
        data: payload
    });
    return result;
});
const getAllVehicleService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { filters, skip, size, sortBy, sortOrder } = payload;
    const result = yield prisma.vehicleProfile.findMany({
        where: filters,
        skip,
        take: Number(size),
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    return result;
});
const updateVehicleProfileService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.vehicleProfile.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const DeletevehicleProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.vehicleProfile.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.vehicleProfileService = {
    createVehicleService,
    getAllVehicleService,
    updateVehicleProfileService,
    DeletevehicleProfileService
};
