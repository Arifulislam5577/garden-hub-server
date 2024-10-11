import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import globalErrorHandler from './global/globalError'
import postRouter from './modules/post/post.route'
import userRouter from './modules/user/user.route'

const app: Application = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('API WORKING!')
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`
  })
})

app.use(globalErrorHandler)

export default app
