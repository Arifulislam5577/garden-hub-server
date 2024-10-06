import express from 'express'
import { auth } from '../../global/auth'
import { ZodValidation } from '../../middleware/ZodValidation'
import { postController } from './post.controller'
import { postValidator } from './post.validation'

const postRouter = express.Router()

postRouter.route('/').post(ZodValidation(postValidator.createPost), auth('user'), postController.createPost)

export default postRouter
