"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleProfileValidation = void 0;
const zod_1 = require("zod");
const createVehicleProfile = zod_1.z.object({
    body: zod_1.z.object({
        vehicle_make: zod_1.z.string({
            required_error: 'Vehicle Make is required',
        }),
        vehicleName: zod_1.z.string({
            required_error: 'Vehicle Name is required',
        }),
        photo: zod_1.z.string({
            required_error: 'Photo is required',
        }),
        purchase_date: zod_1.z.string({
            required_error: 'Purchase Date is required',
        }).optional(),
        registeration_date: zod_1.z.string({
            required_error: 'Registration Date is required',
        }).optional(),
        color: zod_1.z.string({
            required_error: 'Color is required',
        }),
        registeration_validity: zod_1.z.string({
            required_error: 'Registration Validity is required',
        }),
        present_km: zod_1.z.string({
            required_error: 'Present KM is required',
        }),
        mileage: zod_1.z.string({
            required_error: 'Mileage is required',
        }),
        price: zod_1.z.string({
            required_error: 'Price is required',
        }),
        fuel_type: zod_1.z.string({
            required_error: 'Fuel Type is required',
        }),
        body_type: zod_1.z.string({
            required_error: 'Body Type is required',
        }),
        model_name: zod_1.z.string({
            required_error: 'Model Name is required',
        }),
        registration_no: zod_1.z.string({
            required_error: 'Registration Number is required',
        }),
        engine_no: zod_1.z.string({
            required_error: 'Engine Number is required',
        }),
        manufacturing_date: zod_1.z.string({
            required_error: 'Manufacturing Date is required',
        }),
        cubic_capacity: zod_1.z.string({
            required_error: 'Cubic Capacity is required',
        }),
        engine_capacity: zod_1.z.string({
            required_error: 'Engine Capacity is required',
        }),
        sitting_capacity: zod_1.z.string({
            required_error: 'Sitting Capacity is required',
        }),
        chassis_no: zod_1.z.string({
            required_error: 'Chassis Number is required',
        }),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
    }),
});
exports.vehicleProfileValidation = {
    createVehicleProfile
};
