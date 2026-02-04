import { logger } from '../utils/logger.js'

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message)
  res.status(500).json({ status: false, message: err.message || 'Internal Server Error' })
}
