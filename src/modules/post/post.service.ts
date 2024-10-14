import { Types } from 'mongoose'
import { uploadImage } from '../../utils/uploadImage'
import { IPost, IPostResponse } from './post.interface'
import { Post } from './post.model'

const getPostsService = async (): Promise<IPostResponse> => {
  const posts = await Post.find()
    .populate('authorId', 'name email isPaid img')
    .populate('likes', 'name img')
    .populate({ path: 'comments.user', select: 'name email isPaid img' })
    .sort({ likes: -1 })

  return {
    success: true,
    statusCode: 200,
    message: 'Posts fetched successfully',
    data: posts
  }
}
const createPostService = async ({ userId, postInfo }: { userId: string; postInfo: IPost }): Promise<IPostResponse> => {
  if (!userId) {
    return {
      success: false,
      statusCode: 400,
      message: 'User id is required'
    }
  }

  const uploadPostImage = await uploadImage(postInfo.coverImg)
  const post = await Post.create({ ...postInfo, authorId: userId, coverImg: uploadPostImage })
  return {
    success: true,
    statusCode: 201,
    message: 'Post created successfully',
    data: post
  }
}
const addLikeService = async ({
  userId,
  postId
}: {
  userId: Types.ObjectId
  postId: string
}): Promise<IPostResponse> => {
  if (!userId || !postId) {
    return {
      success: false,
      statusCode: 400,
      message: 'User id or post Id is required'
    }
  }

  const post = await Post.findById(postId)

  if (!post) {
    return {
      success: false,
      statusCode: 404,
      message: 'Post not found'
    }
  }

  const isLiked = post.likes.find((like) => like.toString() === userId.toString())

  if (isLiked) {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId }
      },
      { new: true }
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Post unliked successfully',
      data: updatedPost
    }
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { likes: userId }
    },
    { new: true }
  )

  return {
    success: true,
    statusCode: 200,
    message: 'Post liked successfully',
    data: updatedPost
  }
}
const addCommentService = async ({
  postId,
  userId,
  commentText
}: {
  postId: string
  userId: string
  commentText: string
}): Promise<IPostResponse> => {
  if (!postId || !userId || !commentText) {
    return {
      success: false,
      statusCode: 400,
      message: 'Post ID, User ID, and Comment Text are required'
    }
  }

  const post = await Post.findById(postId)

  if (!post) {
    return {
      success: false,
      statusCode: 404,
      message: 'Post not found'
    }
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: { user: userId, commentText }
      }
    },
    { new: true }
  ).populate('comments.user', 'name email isPaid img')

  return {
    success: true,
    statusCode: 200,
    message: 'Comment added successfully',
    data: updatedPost
  }
}
const getUserPostsService = async (userId: string): Promise<IPostResponse> => {
  const posts = await Post.find({ authorId: userId })
  return {
    success: true,
    statusCode: 200,
    message: 'User posts fetched successfully',
    data: posts
  }
}
const updatePostService = async (data: IPost, postId: string): Promise<IPostResponse> => {
  if (!postId) {
    return {
      success: false,
      statusCode: 400,
      message: 'Post is required'
    }
  }
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  )

  if (cleanedData.coverImg) {
    cleanedData.coverImg = await uploadImage(data.coverImg)
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, cleanedData, { new: true })
  return {
    success: true,
    statusCode: 200,
    message: 'Post updated successfully',
    data: updatedPost
  }
}

export const postService = {
  createPostService,
  getPostsService,
  addLikeService,
  addCommentService,
  getUserPostsService,
  updatePostService
}
