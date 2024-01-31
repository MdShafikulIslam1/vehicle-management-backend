"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("../modules/users/route");
const route_2 = require("../modules/vehicleProfile/route");
const route_3 = require("../modules/maintenance/route");
const rootRoute = express_1.default.Router();
const ModuleRoute = [
    {
        path: '/auth',
        routes: route_1.AuthRouter
    },
    {
        path: '/vehicleProfile',
        routes: route_2.vehicleProfileRouter
    },
    {
        path: '/maintenance',
        routes: route_3.MaintenanceRouter
    },
];
ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes));
exports.default = rootRoute;
