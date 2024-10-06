// ROUTE--/api/v1/user/sign-up
// METHOD--POST

import { Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { postService } from './post.service'

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await postService.createPostService({ userId: user.id, postInfo: req.body })
  return res.status(response?.statusCode).json(response)
})

export const postController = {
  createPost
}
