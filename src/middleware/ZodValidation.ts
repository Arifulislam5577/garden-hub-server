import { NextFunction, Request, Response } from 'express'
import { ZodObject, ZodRawShape } from 'zod'
import { catchAsync } from '../utils/catchAsync'

export const ZodValidation = (schema: ZodObject<ZodRawShape>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body)

    next()
  })
}
