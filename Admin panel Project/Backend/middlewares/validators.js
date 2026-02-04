import Joi from 'joi'

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const otpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required()
})

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).json({ status: false, message: error.details[0].message })
  next()
}

export const validateSignupFields = validate(signupSchema)
export const validateSigninFields = validate(signinSchema)
export const validateOtpFields = validate(otpSchema)
