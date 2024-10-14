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
// ROUTE--/api/v1/user/forgot-password
// METHOD--POST

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.forgotPasswordService(req.body)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/reset-password
// METHOD--PATCH

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.resetPasswordService(req.body)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/change-password
// METHOD--PATCH

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const { newPassword, oldPassword } = req.body
  const response = await userService.changePasswordService({ userId: user.id, newPassword, oldPassword })
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/profile
// METHOD--PATCH

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await userService.updateProfileService({ userId: user.id, userInfo: req.body })
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/profile
// METHOD--GET

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await userService.getProfileService(user.id)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/profile/:id
// METHOD--GET

const profileNeedToVerify = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await userService.shouldUserProfileVerify(user.id)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/profile/payment
// METHOD--POST

const profilePayment = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await userService.profileVerifyPaymentService(user.id)
  return res.status(response?.statusCode).json(response)
})

// ROUTE--/api/v1/user/profile/verify/:token
// METHOD--PUT

const profileVerify = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params
  const response = await userService.profileVerifyService(token)
  return res.status(response?.statusCode).json(response)
})

export const userController = {
  signUp,
  signIn,
  forgotPassword,
  updateProfile,
  resetPassword,
  changePassword,
  getProfile,
  profileNeedToVerify,
  profilePayment,
  profileVerify
}
