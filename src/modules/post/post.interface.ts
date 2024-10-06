import { ObjectId } from 'mongoose'

export interface IPost {
  title: string
  description: string
  content: string
  coverImg: string
  authorId: ObjectId
  category: string
  tag: string
}

export interface IPostResponse {
  success: boolean
  statusCode: number
  message: string
  data?: IPost | null
}
