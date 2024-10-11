import { z } from 'zod'

const createPost = z.object({
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string'
    })
    .min(100, {
      message: 'Content must be at least 3 characters'
    }),
  coverImg: z.string({
    required_error: 'Cover image is required',
    invalid_type_error: 'Cover image must be a string'
  }),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string'
  }),
  tag: z.string({
    required_error: 'Tag is required',
    invalid_type_error: 'Tag must be a string'
  })
})

export const postValidator = {
  createPost
}
