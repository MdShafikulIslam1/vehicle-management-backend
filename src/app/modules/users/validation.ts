import { z } from 'zod';
const register = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
        phone: z.string({
            required_error: 'Phone is required'
        }),
        address: z.string({
            required_error: 'Address is required'
        }),
        location: z.string({
            required_error: 'Location is required'
        })       
    })
});

export const userValidation = {
    register
}