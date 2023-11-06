import { Router } from 'express'
import CartManager from '../services/cartManager.js'
const cart_manager = new CartManager('./db/carrito.json')

export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', async (req, res) => {
    const cart = await cart_manager.createCart()
    return res.status(200).json({status: "Success", payload: cart})
})

//Obtener carrito
cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    const cart = await cart_manager.getCartById(Number(cid))
    return res.status(200).json({status: "Success", payload: cart})
})

//Agregar productos al carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {      
        const cart = await cart_manager.addProductToCart(req)
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})