import { OtpCollection } from '../models/otp_model.js'
import { sendMail } from './mailer.js'

const generateOTP = () => Math.floor(100000 + Math.random() * 900000)

export const otpSender = async (email) => {
  const otp = generateOTP()
  const expiryAt = new Date(Date.now() + 2 * 60 * 1000)
  try {
    await OtpCollection.create({ email, otp, expiryAt })
    await sendMail({
      to: email,
      subject: 'Admin Panel OTP',
      text: `Your OTP is ${otp}. It is valid for 2 minutes.`
    })
    return { status: true, message: 'OTP sent successfully' }
  } catch (err) {
    return { status: false, message: err.message }
  }
}
