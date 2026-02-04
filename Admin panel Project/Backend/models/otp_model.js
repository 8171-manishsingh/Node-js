import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  otp: { type: Number, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  expiryAt: { type: Date, required: true }
}, { timestamps: true })

otpSchema.index({ expiryAt: 1 }, { expireAfterSeconds: 0 })

export const OtpCollection = mongoose.model('otp', otpSchema)
