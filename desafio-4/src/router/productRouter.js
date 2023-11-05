import { Router } from 'express'
import ProductManager from '../services/productManager.js'
const product_manager = new ProductManager('./db/products.json')

export const productRouter = Router()

//Obtener productos
productRouter.get('/',  async (req,res)=>{
    const limit = parseInt(req.query.limit)
    const products =  await product_manager.getProducts(limit)
    if (products.length === 0) {
        return res.status(404).json({status: "Error", error: "No existen productos."})
    }
    return res.status(200).json({status: "Success", payload: products})
})

//Obtener producto
productRouter.get('/:id',  async (req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const product = await product_manager.getProductById(id)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        console.log(error)
        res.status(404).json({status: "Error", error: error.message})
    }
})

//Crear producto
productRouter.post('/',  async (req,res)=>{
    try {
        const {body} = req
        const product = await product_manager.addProduct(body)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

//Modificar producto
productRouter.put('/:pid',  async (req, res)=>{
    try {
        const product = await product_manager.updateProduct(req)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})
