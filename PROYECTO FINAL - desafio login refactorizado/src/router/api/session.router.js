import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import {apiUserLogged, webUserLogged} from '../../middleware/auth.js'
import passport from 'passport'

export const sessionRouter = Router()


sessionRouter.post('/login',
  passport.authenticate('login', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'Success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(401)
      .json({
        status: 'Error',
        error: error.message
      })
  }
)

sessionRouter.delete('/logout', async (req, res) =>{
    req.logout(error => {
        if (error) {
            return res.status(500).json({ status: 'logout error', body: err })
        }
        res.status(200).json({ status: 'Success', message: 'logout OK' })
    }) 
})

sessionRouter.get('/current', apiUserLogged, async (req, res) =>{
    try {
        return res.status(200).json({status: "Success", payload: req.user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

