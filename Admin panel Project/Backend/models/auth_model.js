import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

export const AuthCollection = mongoose.model('auth', authSchema)
