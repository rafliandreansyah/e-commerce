import {z} from 'zod';

export const schemaSignIn = z.object({
    email:z.string({required_error: 'Email is required'}).email({message: 'Email is not valid'}),
    password: z.string({required_error: 'Password is required'}).min(6, {message: 'Min length must be at least 6'})
})