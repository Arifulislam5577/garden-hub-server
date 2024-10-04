import express from 'express'
import { ZodValidation } from '../../middleware/ZodValidation'
import { userController } from './user.controller'
import { resetPasswordValidator, signInValidator, signUpValidator, updatePasswordValidator } from './user.validation'

const userRouter = express.Router()

userRouter.route('/sign-up').post(ZodValidation(signUpValidator), userController.signUp)
userRouter.route('/sign-in').post(ZodValidation(signInValidator), userController.signIn)
userRouter.route('/reset-password').post(ZodValidation(resetPasswordValidator), userController.resetPassword)
userRouter.route('/update-password').post(ZodValidation(updatePasswordValidator), userController.updatePassword)

export default userRouter
