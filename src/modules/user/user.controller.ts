import { Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { userService } from './user.service'

const signUp = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.signUpService(req.body)
  return res.status(response?.statusCode).json(response)
})
const signIn = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.signInService(req.body)
  return res.status(response?.statusCode).json(response)
})

export const userController = { signUp, signIn }
