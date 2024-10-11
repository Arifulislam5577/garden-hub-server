import { model, Schema } from 'mongoose'
import { IPost } from './post.interface'

const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    coverImg: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tag: { type: String, required: true },
    likes: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
      }
    ],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        commentText: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Post = model<IPost>('Post', postSchema)
