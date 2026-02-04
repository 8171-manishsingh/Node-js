import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'

const connectWithRetry = async (uri, options = {}) => {
  const maxAttempts = 5
  let attempts = 0
  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ...options
      })
      logger.info('MongoDB connected')
      return
    } catch (err) {
      attempts++
      logger.error(`MongoDB connection failed (attempt ${attempts}): ${err.message}`)
      await new Promise(r => setTimeout(r, Math.min(5000 * attempts, 30000)))
    }
  }
  throw new Error('Failed to connect to MongoDB after multiple attempts')
}

export const connectDB = async () => {
  const uri = process.env.ATLAS_URL || process.env.MONGO_URI
  if (!uri) throw new Error('MONGO_URI / ATLAS_URL is not set in environment')
  await connectWithRetry(uri)
}
