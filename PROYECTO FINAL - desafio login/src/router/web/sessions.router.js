import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import { isValidPassword } from '../../utils/encryptor.js'

export const sessionRouter = Router()

//Formulario de login
sessionRouter.get('/login', async (req,res)=>{
    try {
        return res.render('login', {title: "Login"}) 
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})

sessionRouter.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body
        console.log("body", req.body)
        const user = await dbUser.findOne({email: email}).lean()
        if(!user){
            return res.render('login', {error: "Credenciales incorrectas"})
        }
        const isValid = isValidPassword(password, user)
        if(!isValid){
            return res.render('login', {error: "Credenciales incorrectas"})
        }

        if (email === 'adminCoder@coder.com' && password ==='adminCod3r123' ){
            user.rol = 'admin'
        }else{
            user.rol = 'user'
        }

        delete user.password
        delete user._id
        req.session.user = user
        return res.redirect('/products')
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})

sessionRouter.delete('/logout', async (req, res) =>{
    req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ status: 'logout error', body: err })
        }
        res.redirect("/sessions/login")
      })
})


