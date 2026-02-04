import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthCollection } from '../models/auth_model.js'
import { UserCollection } from '../models/user_model.js'
import { OtpCollection } from '../models/otp_model.js'
import { otpSender } from '../services/otp_service.js'

const JWT_EXPIRY = '1d'

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const existing = await AuthCollection.findOne({ email })
    if (existing) return res.status(400).json({ status: false, message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 12)
    const user = await UserCollection.create({ email })
    await AuthCollection.create({ email, password: hashed, user: user._id })
    res.status(201).json({ status: true, message: 'User registered successfully' })
  } catch (err) {
    next(err)
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const auth = await AuthCollection.findOne({ email })
    if (!auth) return res.status(404).json({ status: false, message: 'User not found' })

    const isMatch = await bcrypt.compare(password, auth.password)
    if (!isMatch) return res.status(401).json({ status: false, message: 'Invalid credentials' })

    const isOtpSent = await otpSender(email)
    res.json(isOtpSent)
  } catch (err) {
    next(err)
  }
}

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    const record = await OtpCollection.findOne({ email, otp })
    if (!record) return res.status(400).json({ status: false, message: 'OTP is incorrect' })
    if (record.expiryAt < new Date()) return res.status(400).json({ status: false, message: 'OTP expired' })

    await OtpCollection.deleteMany({ email })

    const auth = await AuthCollection.findOne({ email }).populate('user')
    const payload = { id: auth._id, email: auth.email, role: auth.user?.role || 'employee', userId: auth.user }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: JWT_EXPIRY })

    res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
    res.json({ status: true, message: 'OTP verified, signed in', token })
  } catch (err) {
    next(err)
  }
}

export const signout = (req, res) => {
  res.clearCookie('auth_token')
  res.json({ status: true, message: 'Signed out' })
}

export const changePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body
    const auth = await AuthCollection.findOne({ email })
    if (!auth) return res.status(404).json({ status: false, message: 'User not found' })

    const isMatch = await bcrypt.compare(oldPassword, auth.password)
    if (!isMatch) return res.status(400).json({ status: false, message: 'Old password incorrect' })

    const hashed = await bcrypt.hash(newPassword, 12)
    await AuthCollection.updateOne({ email }, { $set: { password: hashed } })
    res.json({ status: true, message: 'Password changed' })
  } catch (err) {
    next(err)
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const auth = await AuthCollection.findOne({ email })
    if (!auth) return res.status(404).json({ status: false, message: 'User not found' })
    const isOtpSent = await otpSender(email)
    res.json(isOtpSent)
  } catch (err) {
    next(err)
  }
}

export const verifyOtpForCreatePassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body
    const record = await OtpCollection.findOne({ email, otp })
    if (!record) return res.status(400).json({ status: false, message: 'OTP incorrect' })
    if (record.expiryAt < new Date()) return res.status(400).json({ status: false, message: 'OTP expired' })

    const hashed = await bcrypt.hash(newPassword, 12)
    await AuthCollection.updateOne({ email }, { $set: { password: hashed } })
    await OtpCollection.deleteMany({ email })
    res.json({ status: true, message: 'Password updated' })
  } catch (err) {
    next(err)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token
    if (!token) return res.status(401).json({ status: false, message: 'No token' })
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const auth = await AuthCollection.findById(decoded.id).populate('user', '-__v -createdAt -updatedAt')
    res.json({ status: true, user: auth })
  } catch (err) {
    next(err)
  }
}
