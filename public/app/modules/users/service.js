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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const hashPass_1 = require("../../../helpers/hashPass");
const jwtHelpes_1 = require("../../../helpers/jwtHelpes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findFirst({
        where: {
            email: payload.email
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This user not found');
    }
    if (payload.password === undefined) {
        throw new ApiError_1.default(http_status_1.default.NO_CONTENT, 'password not given');
    }
    if (isExist !== null &&
        payload.password !== undefined && (yield (0, hashPass_1.comparePasswords)(payload.password, isExist.password))) {
        //create access token, refresh token 
        const data = { id: isExist.id, role: isExist.role, email: isExist.email };
        const accessToken = jwtHelpes_1.JwtHelpers.createToken(data, config_1.default.jwt.accessToken, config_1.default.jwt.accessTokenExpiresIn);
        return {
            accessToken
        };
        // const refreshToken = await createRefreshToken(data)
    }
    else {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Password not match or invalid');
    }
});
const registerService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let role = null;
    const isExist = yield prisma.user.findFirst({
        where: {
            email: payload.email
        }
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This user already exist in our database');
    }
    const Hashed = yield (0, hashPass_1.hashPassword)(payload.password);
    payload.password = Hashed;
    if (payload.role != undefined || payload.role != null) {
        role = payload.role;
    }
    else {
        role = client_1.RoleEnumType.USER;
    }
    const response = yield prisma.user.create({
        data: payload
    });
    if (!response) {
        throw new ApiError_1.default(400, 'Registration falied');
    }
    const data = { id: response.id, role: role, email: response.email };
    // const accessToken = await signJwt(data)
    const accessToken = jwtHelpes_1.JwtHelpers.createToken(data, config_1.default.jwt.accessToken, config_1.default.jwt.accessTokenExpiresIn);
    return {
        accessToken
    };
});
exports.AuthServices = {
    loginService,
    registerService
};
