import { z } from 'zod';
const create = z.object({
    body: z.object({
        task: z.string({
            required_error: 'Task name is required'
        }),
        repair_shop_address: z.string({
            required_error: 'Repair_shop_address is required'
        }),
        expense: z.string({
            required_error: 'Expense value is required'
        }),
        lastDone: z.string({
            required_error: 'Last maintenance date is required'
        }),
        currentDate: z.string({
            required_error: 'Current maintenance date is required'
        }),
        nextDue: z.string({
            required_error: 'Next due maintenance date is required'
        }),
        vehicleProfileId:z.string({
            required_error: 'Vehicle profile ID date is required'
        })
    })
});

export const maintenanceValidation ={
    create
}