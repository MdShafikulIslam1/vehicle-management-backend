"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/vehicle-profile', controller_1.vehicleController.createVehicleController);
router.get('/vehicle-profile', controller_1.vehicleController.getAllVehicleController);
router.delete('/vehicle-profile', controller_1.vehicleController.deleteVehicleController);
router.patch('/vehicle-profile', controller_1.vehicleController.updateVehicleController);
exports.AuthRouter = router;
