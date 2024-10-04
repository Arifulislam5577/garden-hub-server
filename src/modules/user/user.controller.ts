import { Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { userService } from './user.service'

// ROUTE--/api/v1/user/sign-up
// METHOD--POST
const signUp = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.signUpService(req.body)
  return res.status(response?.statusCode).json(response)
})
// ROUTE--/api/v1/user/sign-in
// METHOD--POST
const signIn = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.signInService(req.body)
  return res.status(response?.statusCode).json(response)
})
// ROUTE--/api/v1/user/reset-password
// METHOD--POST
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.resetPasswordService(req.body)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/update-password
// METHOD--POST
const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.updatePasswordService(req.body)
  return res.status(response?.statusCode).json(response)
})

export const userController = { signUp, signIn, resetPassword, updatePassword }
