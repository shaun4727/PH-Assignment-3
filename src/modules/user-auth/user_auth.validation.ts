import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Name must be string',
            required_error: 'Name is required'
        }),
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email('Invalid email format'),
        password: z.string({
            invalid_type_error: 'Password must be string',
            required_error: 'Password is required'
        })
    })
});

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required.' }).email('Invalid email format'),
        password: z.string({
            invalid_type_error: 'Password must be string',
            required_error: 'Password is required'
        })
    })
});

export const userValidations = {
    createUserValidationSchema,
    loginValidationSchema
};
