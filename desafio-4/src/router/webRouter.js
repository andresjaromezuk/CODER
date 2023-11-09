import { Router } from 'express'
import multerMiddleware from '../middleware/multer.js'
const upload = multerMiddleware('images', 'product')
import ProductManager from '../services/productManager.js'
const product_manager = new ProductManager('./db/productos.json')

export const webRouter = Router()

// Cargar imágenes
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

//Mostrar productos disponibles por vista
webRouter.get('/products', async (req, res) =>{
   try {
     const limit = parseInt(req.query.limit)
     const products =  await product_manager.getProducts(limit)
     return res.render('home', {title:"Nuestros productos" ,products})
   } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
   }
})

webRouter.get('/realtimeproducts', async (req, res) =>{
   try {
          const limit = parseInt(req.query.limit)
          const products =  await product_manager.getProducts(limit)
          const ioServer = req.io
          ioServer.on('connection', async (socket)=>{
               socket.emit('productos', products)
               socket.on('nuevoProducto', async (socket)=>{
                    console.log(socket)
                    await product_manager.addProduct(socket)
                    const products =  await product_manager.getProducts(limit)
                    ioServer.sockets.emit('productos', products)
               })
          })
          return res.render('realTimeProducts', {title:"Nuestros productos"})
   } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
   }
})

