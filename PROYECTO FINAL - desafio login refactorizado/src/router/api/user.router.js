import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import passport from 'passport'

export const userRouter = Router()

userRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'Success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(400)
      .json({
        status: 'error',
        message: error.message
      })
  }
)

userRouter.get('/profile', async (req, res) =>{
    try {
        //const user = await dbUser.findOne({email:req.user.email}).lean()
        //delete user.password
        return res.status(200).json({status: "Success", payload: req.user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

userRouter.put('/resetPassword', async (req, res) =>{
    try {
        await dbUser.resetPassword(req.body)
        return res.status(200).json({status: "Success", payload: "Nueva contraseña registrada"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: "Error", error: error.message})
    }
})

