"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const validation_1 = require("./validation");
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/create', (0, validateUser_1.default)(validation_1.vehicleProfileValidation.createVehicleProfile), controller_1.vehicleController.createVehicleController);
router.get('/', controller_1.vehicleController.getAllVehicleController);
router.get('/:id', controller_1.vehicleController.getSingleVehicleController);
router.delete('/:id', controller_1.vehicleController.deleteVehicleController);
router.patch('/:id', controller_1.vehicleController.updateVehicleController);
exports.vehicleProfileRouter = router;
