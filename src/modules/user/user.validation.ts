import { z } from 'zod'

const signUpValidator = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
    message: 'Name must be at least 4 characters'
  }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email address' })
    .trim(),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    }),
  role: z.enum(['user', 'admin']).optional().default('user'),
  img: z.string().optional().default(''),
  isVerified: z.boolean().optional().default(false)
})

const signInValidator = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email address' })
    .trim(),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    })
})

const resetPasswordValidator = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email address' })
    .trim()
})

const updatePasswordValidator = z.object({
  password: z
    .string({
      required_error: 'New Password is required',
      invalid_type_error: 'New Password must be a string'
    })
    .min(6, {
      message: 'New Password must be at least 6 characters'
    }),
  resetToken: z.string({ required_error: 'Reset token is required' }).min(6, {
    message: 'Reset token must be 6 characters'
  })
})

export { resetPasswordValidator, signInValidator, signUpValidator, updatePasswordValidator }
