"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        task: zod_1.z.string({
            required_error: 'Task name is required'
        }),
        repair_shop_address: zod_1.z.string({
            required_error: 'Repair_shop_address is required'
        }),
        expense: zod_1.z.string({
            required_error: 'Expense value is required'
        }),
        lastDone: zod_1.z.string({
            required_error: 'Last maintenance date is required'
        }),
        currentDate: zod_1.z.string({
            required_error: 'Current maintenance date is required'
        }),
        nextDue: zod_1.z.string({
            required_error: 'Next due maintenance date is required'
        }),
        vehicleProfileId: zod_1.z.string({
            required_error: 'Vehicle profile ID date is required'
        })
    })
});
exports.maintenanceValidation = {
    create
};
