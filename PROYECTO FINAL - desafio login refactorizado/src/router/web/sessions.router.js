import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import passport from 'passport'

export const sessionRouter = Router()

//Formulario de login
sessionRouter.get('/login', async (req,res)=>{
    try {
        return res.render('login', {title: "Login"}) 
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})

sessionRouter.post('/login',
passport.authenticate('login', {
  successRedirect: '/users/profile',
  failureRedirect: '/sessions/login',
})
)

sessionRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

sessionRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/users/profile',
    failureRedirect: '/sessions/login',
  })
)

sessionRouter.delete('/logout', async (req, res) =>{
    req.logout(error => {
        if (error) {
          console.log(error)
        }
        res.redirect('/sessions/login')
      })
})


