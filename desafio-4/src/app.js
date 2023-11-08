import express, { json, urlencoded } from 'express'
import {engine} from 'express-handlebars'
import {apiRouter} from './router/apiRouter.js'
import {webRouter} from './router/webRouter.js'
import path from 'path'
import __dirname from './util.js'

//Express
const app = express()
const PORT = 8080

//Middlewares 
app.use(urlencoded({ extended: true }))
app.use(json())
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/static', express.static(path.join(__dirname, '../static')))


//Rutas
app.use('/api', apiRouter)
app.use('/', webRouter)

app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})