import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  name: { type: String, trim: true },
  emp_id: { type: String, trim: true },
  phone: { type: String, trim: true },
  role: { type: String, enum: ['admin', 'manager', 'employee'], default: 'employee' },
  joining_date: { type: Date },
  salary: { type: Number },
  education: String,
  exp: String,
  department: String,
  profile_pic: String,
  address: String
}, { timestamps: true })

export const UserCollection = mongoose.model('users', userSchema)
