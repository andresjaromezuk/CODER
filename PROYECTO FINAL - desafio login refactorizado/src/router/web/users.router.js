import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import { webUserLogged } from '../../middleware/auth.js'
import passport from 'passport'

export const userRouter = Router()

userRouter.get('/register', async (req,res)=>{
    try {
        return res.render("register")
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

userRouter.post('/register',
  passport.authenticate('register', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/register',
  })
)

userRouter.get('/profile', webUserLogged, async (req, res) =>{
    try {
        //const user = await dbUser.findOne({email:req.user.email}).lean()
        //delete user.password
        return res.render('profile', {user: req.user})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

userRouter.get('/resetPassword', async (req, res) =>{
    try {
        return res.render('resetPassword')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/sessions/login')
    }
})

userRouter.post('/resetPassword', async (req, res) =>{
    try {
        await dbUser.resetPassword(req.body)
        console.log("funcionó")
        return res.redirect('/sessions/login')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/sessions/login')
    }
})

