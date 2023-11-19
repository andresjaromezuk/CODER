import { Router } from 'express'
import CartManager from '../services/cartManager.js'
const cart_manager = new CartManager('./db/carrito.json')
import ProductManager from '../services/productManager.js'
const product_manager = new ProductManager('./db/productos.json')

export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cart_manager.createCart()
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

//Obtener carrito
cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params
        const cart = await cart_manager.getCartById(Number(cid))
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(404).json({status: "Error", error: error.message})
    }
})

//Agregar productos al carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {      
        const {cid, pid} = req.params
        //Si el producto existe entra a addProductToCart, sino salta
        // error del getProductById
        await product_manager.getProductById(Number(pid))
        const cart = await cart_manager.addProductToCart(cid, pid)
        return res.status(200).json({status: "Success", payload: cart})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})