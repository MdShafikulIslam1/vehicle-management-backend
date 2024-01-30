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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createVehicleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.vehicleProfileService.createVehicleService(req.body);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Vehicle added successful',
            data: result
        });
    }
    catch (err) {
        return next(err);
    }
});
const getAllVehicleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sortBy = req.query.sortBy || "id";
    try {
        const { page = 1, size = 10, sortOrder = "asc", make, model, vehicleName, search } = req.query;
        // Define filter conditions
        const filters = {
            AND: [],
        };
        if (make) {
            filters.AND.push({ price: { gte: parseFloat(make.toString()) } });
        }
        if (model) {
            filters.AND.push({ price: { gte: parseFloat(model.toString()) } });
        }
        if (vehicleName) {
            filters.AND.push({ price: { gte: parseFloat(vehicleName.toString()) } });
        }
        if (search) {
            filters.AND.push({
                OR: [{ title: { contains: search.toString(), mode: "insensitive" } }],
            });
        }
        const skip = (Number(page) - 1) * Number(size);
        const total = yield prisma.vehicleProfile.count({
            where: filters,
        });
        const totalPage = Math.ceil(total / Number(size));
        const result = yield prisma.vehicleProfile.findMany({
            where: filters,
            skip,
            take: Number(size),
            orderBy: {
                [sortBy]: sortOrder,
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
    }
    catch (err) {
        return next(err);
    }
});
const deleteVehicleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const result = yield service_1.vehicleProfileService.DeletevehicleProfileService(id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Vehicle deleted successful',
            data: result
        });
    }
    catch (err) {
        return next(err);
    }
});
const updateVehicleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // const isAdmin = req?.user?.role === "admin";
        // if (!isAdmin) {
        //   return res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized access",
        //   });
        // }
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const data = req.body;
        const result = yield service_1.vehicleProfileService.updateVehicleProfileService(data, id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Vehicle uodated successful',
            data: result
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.vehicleController = {
    createVehicleController,
    getAllVehicleController,
    deleteVehicleController,
    updateVehicleController
};
