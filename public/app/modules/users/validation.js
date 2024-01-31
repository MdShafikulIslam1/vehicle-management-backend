"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const register = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }),
        email: zod_1.z.string({
            required_error: 'Email is required'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required'
        }),
        phone: zod_1.z.string({
            required_error: 'Phone is required'
        }),
        address: zod_1.z.string({
            required_error: 'Address is required'
        }),
        location: zod_1.z.string({
            required_error: 'Location is required'
        })
    })
});
exports.userValidation = {
    register
};
