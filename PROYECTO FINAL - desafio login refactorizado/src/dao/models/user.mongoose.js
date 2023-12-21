import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { createHash, isValidPassword } from '../../utils/encryptor.js'

const userSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    publicInfo: function(){
      return{
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }
    }
  },
  statics: {
    register: async function (body){
      const {password} = body
      const checkUser = await mongoose.model('users').findOne({email:body.email}).lean()
      if(checkUser){
          throw new Error ('El usuario ya está registrado')
          //return res.status(400).json({status: "Error", error: "El usuario ya está registrado"})
      }
      const hash = createHash(password)
      body.password = hash
      const user = await mongoose.model('users').create(body)
      return user.toObject()
    },
    login: async function (email, password){
     
      const user = await mongoose.model('users').findOne({email: email}).lean()
  
      if(!user){
          throw new Error ('Credenciales incorrectas')
      }
      const isValid = isValidPassword(password, user)
  
      if(!isValid){
        throw new Error ('Credenciales incorrectas')
      }
      
      if (email === 'adminCoder@coder.com' && password ==='adminCod3r123' ){
          user.rol = 'admin'
      }else{
          user.rol = 'user'
      }
      
      delete user.password
      delete user._id
  
      return user
    },
    resetPassword: async function (body) {
      const {email, password} = body
      const newPassword = createHash(password)

      const actualizado = await mongoose.model('users').findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return actualizado
    }
  },
})

export const dbUser = mongoose.model('users', userSchema)