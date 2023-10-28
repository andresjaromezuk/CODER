import {ProductManager} from './productManager.js'
import express, { json, urlencoded } from 'express'


const app = express()
const product_manager = new ProductManager('./db/products.json')
const PORT = 8080

app.get('/products', async (req,res)=>{
    const limit = parseInt(req.query.limit)
    const products = await product_manager.getProducts(limit)
    return res.json(products)
})

app.get('/products/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid)
    const products = await product_manager.getProductById(id)
    if(!products){
        return res.status(404).json({error: "El producto no pudo ser encontrado"})
    }
    return res.status(200).json(products)
})

app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})