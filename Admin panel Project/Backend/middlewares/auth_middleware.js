import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies?.auth_token
    if (!token) return res.status(401).json({ status: false, message: 'Unauthorized' })
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid token' })
  }
}

export const checkAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ status: false, message: 'Unauthorized' })
  if (req.user.role !== 'admin') return res.status(403).json({ status: false, message: 'Only admin can access this' })
  next()
}
