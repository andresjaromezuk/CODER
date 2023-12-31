import { Router } from 'express'
import {cartManager} from '../dao/services/cartManager.mongoose.js'
import {productManager} from '../dao/services/productManager.mongoose.js'


export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

//Obtener carrito
 cartRouter.get('/:cid', async (req, res) => {
     try {
         const {cid} = req.params
         const cart = await cartManager.getCartById(cid)
         return res.status(200).json({status: "Success", payload: cart})
     } catch (error) {
         res.status(404).json({status: "Error", error: error.message})
     }
}) 

//Agregar productos al carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {      
        const {cid, pid} = req.params
        await productManager.getProductById(pid)
        const cart = await cartManager.addProductToCart(cid, pid)
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})