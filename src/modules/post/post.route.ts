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
postRouter.route('/me').get(auth('user'), postController.getUserPost)
postRouter.route('/update/:postId').put(auth('user'), postController.updatePost)

export default postRouter
