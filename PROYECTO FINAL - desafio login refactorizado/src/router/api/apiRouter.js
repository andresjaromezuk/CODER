import { Router } from 'express'
import {productRouter} from './productRouter.js'
import {cartRouter} from './cartRouter.js'
import { userRouter } from './user.router.js'
import { sessionRouter } from './session.router.js'
export const apiRouter = Router()

apiRouter.use('/products', productRouter)

apiRouter.use('/carts', cartRouter)

apiRouter.use('/users', userRouter)
apiRouter.use('/sessions', sessionRouter)