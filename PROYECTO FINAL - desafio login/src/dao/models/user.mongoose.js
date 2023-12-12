import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const userSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
}, {
  strict: 'throw',
  versionKey: false
})

export const dbUser = mongoose.model('users', userSchema)