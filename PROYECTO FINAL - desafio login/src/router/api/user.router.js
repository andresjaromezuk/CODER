import { Router } from 'express'
import { dbUser } from '../../dao/models/user.mongoose.js'
import { createHash } from '../../utils/encryptor.js'
export const userRouter = Router()

userRouter.post('/register', async (req,res)=>{
    try {
        const {body} = req
        const {password} = body
        const hash = createHash(password)
        body.password = hash
        const user = await dbUser.create(body)
        return res.status(200).json({status: "Success", payload: user.toObject()})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
    
})
userRouter.get('/profile', async (req, res) =>{
    try {
        const user = await dbUser.findOne({email:req.session.user}).lean()
        delete user.password
        return res.status(200).json({status: "Success", payload: products})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

