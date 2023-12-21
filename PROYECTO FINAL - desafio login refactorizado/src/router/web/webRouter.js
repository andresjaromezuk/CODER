import { Router } from 'express'
import multerMiddleware from '../../middleware/multer.js'
const upload = multerMiddleware('images', 'product')
import {productManager} from '../../dao/services/productManager.mongoose.js'
import {cartManager} from '../../dao/services/cartManager.mongoose.js'
import { sessionRouter } from './sessions.router.js'
import { userRouter } from './users.router.js'

export const webRouter = Router()

webRouter.use('/sessions', sessionRouter)
webRouter.use('/users', userRouter)

//Endpoint para subir imágenes
webRouter.post('/uploads', upload.single('image'), async (req, res) =>{
   try {
        const {code} = req.body 
        const {filename} = req.file
        const product = await productManager.addImageToProduct(code, filename)
        return res.status(200).json({status: "Success", payload: product})
   } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
   }
})

//Enpoint para mostrar productos

webRouter.get('/products', async(req,res)=> {
     try {
          //Limit fijo para probar paginación
          req.query.limit = 1
          const products = await productManager.getProducts(req.query)
          console.log(products)
          return res.render('products', {title:"Nuestros productos", products, user : req.user || null})
     } catch (error) {
          res.status(500).json({status: "Error", error: error.message})
     }

})

//Detalle del producto
webRouter.get('/products/:pid', async(req,res)=> {
     try {
          const {pid} = req.params
          const product = await productManager.getProductById(pid)
          console.log(product)
          return res.render('product', {title: `${product.title}`, product})
     } catch (error) {
          res.status(500).json({status: "Error", error: error.message})
     }

})

//Detalle del carrito
webRouter.get('/carts/:cid', async(req,res)=> {
     try {
          const {cid} = req.params
          const products = await cartManager.getCartById(cid)
          console.log(products)
          return res.render('cart', {title: "Tu carrito", products: products})
     } catch (error) {
          res.status(500).json({status: "Error", error: error.message})
     }

})

webRouter.get('/', async(req,res)=> {
     try {
          return res.redirect('/sessions/login')
     } catch (error) {
          res.status(500).json({status: "Error", error: error.message})
     }

})



