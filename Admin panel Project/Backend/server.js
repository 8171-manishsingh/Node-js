import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth_routes.js'
import adminRoutes from './routes/admin_routes.js'
import { errorHandler } from './middlewares/error_handler.js'
import { logger } from './utils/logger.js'

const PORT = process.env.PORT || 4000

await connectDB()

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOptions))

const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 60 })
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`))
