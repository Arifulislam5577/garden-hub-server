import { ObjectId } from 'mongoose'

export interface IPost {
  content: string
  coverImg: string
  authorId: ObjectId
  category: string
  tag: string
  likes: [
    {
      userId: ObjectId
    }
  ]
  comments: [
    {
      userId: ObjectId
      commentText: string
    }
  ]
}

export interface IPostResponse {
  success: boolean
  statusCode: number
  message: string
  data?: IPost | IPost[] | null
}
