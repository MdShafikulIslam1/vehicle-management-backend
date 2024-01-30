"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/create', (0, validateUser_1.default)(validation_1.maintenanceValidation.create), controller_1.maintenanceController.createController);
router.get('/allMaintenance', controller_1.maintenanceController.getAllController);
router.get('/singleMaintenance/:id', controller_1.maintenanceController.singleController);
router.delete('/delete/:id', controller_1.maintenanceController.deleteController);
router.patch('/update/:id', controller_1.maintenanceController.updateController);
exports.MaintenanceRouter = router;
