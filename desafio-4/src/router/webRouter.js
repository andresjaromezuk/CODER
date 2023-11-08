import { Router } from 'express'
import multerMiddleware from '../middleware/multer.js'
const upload = multerMiddleware('images', 'product')
import ProductManager from '../services/productManager.js'
const product_manager = new ProductManager('./db/productos.json')

export const webRouter = Router()

webRouter.post('/uploads', upload.single('image'), async (req, res) =>{
   try {
        const {code} = req.body 
        const {filename} = req.file
        const product = await product_manager.addImageToProduct(code,filename)
        return res.status(200).json({status: "Success", payload: product})
   } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
   }
})

