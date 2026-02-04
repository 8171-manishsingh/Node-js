import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

export const sendMail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || `Admin Panel <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html
  })
}
