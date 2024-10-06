import { model, Schema } from 'mongoose'
import { IPost } from './post.interface'

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    coverImg: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tag: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export const Post = model<IPost>('Post', postSchema)
