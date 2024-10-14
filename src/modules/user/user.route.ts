import express from 'express'
import { auth } from '../../global/auth'
import { ZodValidation } from '../../middleware/ZodValidation'
import { userController } from './user.controller'

import {
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  signInValidator,
  signUpValidator
} from './user.validation'

const userRouter = express.Router()

userRouter.route('/sign-up').post(ZodValidation(signUpValidator), userController.signUp)
userRouter.route('/sign-in').post(ZodValidation(signInValidator), userController.signIn)
userRouter.route('/forgot-password').post(ZodValidation(forgotPasswordValidator), userController.forgotPassword)
userRouter.route('/reset-password').patch(ZodValidation(resetPasswordValidator), userController.resetPassword)
userRouter
  .route('/profile')
  .get(auth('user'), userController.getProfile)
  .patch(auth('user'), userController.updateProfile)
userRouter.route('/profile/:id').get(auth('user'), userController.profileNeedToVerify)
userRouter
  .route('/change-password')
  .patch(auth('user'), ZodValidation(changePasswordValidator), userController.changePassword)

userRouter.route('/profile/payment').post(auth('user'), userController.profilePayment)
userRouter.route('/profile/verify/:token').put(auth('user'), userController.profileVerify)

export default userRouter
