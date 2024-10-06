import { z } from 'zod'

const createPost = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .min(3, {
      message: 'Title must be at least 3 characters'
    })
    .max(50, {
      message: 'Title must be less than 50 characters'
    }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .min(3, {
      message: 'Description must be at least 3 characters'
    })
    .max(300, {
      message: 'Description must be less than 300 characters'
    }),
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
