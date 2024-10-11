import express from 'express'
import { auth } from '../../global/auth'
import { ZodValidation } from '../../middleware/ZodValidation'
import { postController } from './post.controller'
import { postValidator } from './post.validation'

const postRouter = express.Router()

postRouter
  .route('/')
  .get(postController.getPosts)
  .post(ZodValidation(postValidator.createPost), auth('user'), postController.createPost)

postRouter.route('/:postId').patch(auth('user'), postController.addLike).put(auth('user'), postController.addComment)

export default postRouter
