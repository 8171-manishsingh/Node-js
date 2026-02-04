import jwt from 'jsonwebtoken'
import { UserCollection } from '../models/user_model.js'
import { AuthCollection } from '../models/auth_model.js'

export const addUserByAdmin = async (req, res, next) => {
  try {
    const { email, name, emp_id, role, joining_date, salary, department } = req.body
    const exists = await UserCollection.findOne({ email })
    if (exists) return res.status(400).json({ status: false, message: 'User already exists' })
    const user = await UserCollection.create({ email, name, emp_id, role, joining_date, salary, department })
    res.status(201).json({ status: true, message: 'User added', user })
  } catch (err) {
    next(err)
  }
}

export const updateProfileByUser = async (req, res, next) => {
  try {
    const { email } = req.body
    await UserCollection.updateOne({ email }, { $set: req.body })
    res.json({ status: true, message: 'Profile updated' })
  } catch (err) {
    next(err)
  }
}

export const updateProfileByAdmin = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await UserCollection.updateOne({ email }, { $set: req.body })
    const auth = await AuthCollection.findOne({ email })
    if (auth) {
      const payload = { id: auth._id, email: auth.email }
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
    }
    res.json({ status: true, message: 'Profile updated' })
  } catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserCollection.find().sort({ createdAt: -1 })
    res.json({ status: true, users })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id
    await UserCollection.findByIdAndDelete(id)
    res.json({ status: true, message: 'User deleted' })
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = req.query.id
    const user = await UserCollection.findById(id)
    res.json({ status: true, user })
  } catch (err) {
    next(err)
  }
}
