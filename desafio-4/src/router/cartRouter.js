import { Router } from 'express'
import CartManager from '../services/cartManager.js'
const cart_manager = new CartManager('./db/carts.json')

export const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    const cart = await cart_manager.createCart()
    return res.status(200).json({status: "Success", payload: cart})
})

cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    const cart = await cart_manager.getCartById(Number(cid))
    return res.status(200).json({status: "Success", payload: cart})
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {      
        const cart = await cart_manager.addProductToCart(req)
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})