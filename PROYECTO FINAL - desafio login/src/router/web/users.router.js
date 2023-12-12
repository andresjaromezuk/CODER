import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import { createHash } from '../../utils/encryptor.js'
import { webUserLogged } from '../../middleware/sessions.js'

export const userRouter = Router()

userRouter.get('/register', async (req,res)=>{
    try {
        return res.render("register")
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})

userRouter.post('/register', async (req,res)=>{
    try {
        const {body} = req
        const {password} = body
        const hash = createHash(password)
        body.password = hash
        const user = await dbUser.create(body)
        return res.redirect("/sessions/login")
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})
userRouter.get('/profile', webUserLogged, async (req, res) =>{
    try {
        const user = await dbUser.findOne({email:req.session.user.email}).lean()
        delete user.password
        return res.render('profile', {user: user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

