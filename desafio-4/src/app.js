import express, { json, urlencoded } from 'express'
import {apiRouter} from './router/apiRouter.js'

//Express
const app = express()
const PORT = 8080

//Middlewares 
app.use(urlencoded({ extended: true }))
app.use(json())

//Rutas
app.use('/api', apiRouter)

app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})