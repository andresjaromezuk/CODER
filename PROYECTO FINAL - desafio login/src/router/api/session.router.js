import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import { isValidPassword } from '../../utils/encryptor.js'
import {apiUserLogged} from '../../middleware/sessions.js'

export const sessionRouter = Router()

sessionRouter.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body
        console.log(req.body)
        const user = await dbUser.findOne({email: email}).lean()
        console.log("user", user)
        if(!user){
            return res.status(400).json({ status: 'error', message: 'login failed' })
        }
        const isValid = isValidPassword(password, user)
        if(!isValid){
            return res.status(400).json({ status: 'error', message: 'login failed' })
        }

        if (email === 'adminCoder@coder.com' && password ==='adminCod3r123' ){
            user.rol = 'admin'
        }else{
            user.rol = 'user'
        }

        delete user.password
        delete user._id
        req.session.user = user
        return res.status(200).json({status: "Success", payload: req.session.user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    } 
})

sessionRouter.delete('/logout', async (req, res) =>{
    req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ status: 'logout error', body: err })
        }
        res.json({ status: 'Success', message: 'logout OK' })
      })
})

sessionRouter.get('/current', apiUserLogged, async (req, res) =>{
    try {
        console.log(req.session)
        return res.status(200).json({status: "Success", payload: req.session.user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

