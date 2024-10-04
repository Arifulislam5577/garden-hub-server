import express from 'express'
import { ZodValidation } from '../../middleware/ZodValidation'
import { userController } from './user.controller'
import { signInValidator, signUpValidator } from './user.validation'

const userRouter = express.Router()

userRouter.route('/sign-up').post(ZodValidation(signUpValidator), userController.signUp)
userRouter.route('/sign-in').post(ZodValidation(signInValidator), userController.signIn)

export default userRouter
