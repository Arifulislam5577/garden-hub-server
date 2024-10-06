import { IPost, IPostResponse } from './post.interface'
import { Post } from './post.model'

export const createPostService = async ({
  userId,
  postInfo
}: {
  userId: string
  postInfo: IPost
}): Promise<IPostResponse> => {
  if (!userId) {
    return {
      success: false,
      statusCode: 400,
      message: 'User id is required'
    }
  }

  const post = await Post.create({ ...postInfo, authorId: userId })
  return {
    success: true,
    statusCode: 201,
    message: 'Post created successfully',
    data: post
  }
}

export const postService = {
  createPostService
}
