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

const getPosts = catchAsync(async (req: Request, res: Response) => {
  const response = await postService.getPostsService()
  return res.status(response?.statusCode).json(response)
})

const addLike = catchAsync(async (req: Request, res: Response) => {
  const response = await postService.addLikeService({ postId: req.params.postId, userId: req?.user?.user?.id })
  return res.status(response?.statusCode).json(response)
})

const addComment = catchAsync(async (req: Request, res: Response) => {
  const response = await postService.addCommentService({
    postId: req.params.postId,
    userId: req?.user?.user?.id,
    commentText: req.body.commentText
  })
  return res.status(response?.statusCode).json(response)
})

const getUserPost = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.user
  const response = await postService.getUserPostsService(user.id)
  return res.status(response?.statusCode).json(response)
})

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params
  const response = await postService.updatePostService(req.body, postId)
  return res.status(response?.statusCode).json(response)
})

export const postController = {
  createPost,
  getPosts,
  addLike,
  addComment,
  getUserPost,
  updatePost
}
