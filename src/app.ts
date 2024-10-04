import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './global/globalError'
import userRouter from './modules/user/user.route'

const app: Application = express()
app.use(express.json())

app.use('/api/v1/user', userRouter)

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
