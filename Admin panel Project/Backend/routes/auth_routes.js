import express from 'express'
import {
  signup,
  signin,
  verifyOTP,
  signout,
  changePassword,
  forgetPassword,
  verifyOtpForCreatePassword,
  getCurrentUser
} from '../controllers/auth_controller.js'
import { validateSignupFields, validateSigninFields, validateOtpFields } from '../middlewares/validators.js'

const router = express.Router()

router.post('/signup', validateSignupFields, signup)
router.post('/signin', validateSigninFields, signin)
router.post('/verify-otp', validateOtpFields, verifyOTP)
router.post('/signout', signout)
router.post('/change-password', changePassword)
router.post('/forget-password', forgetPassword)
router.post('/verify-forget-password', verifyOtpForCreatePassword)
router.get('/get-current-user', getCurrentUser)

export default router
