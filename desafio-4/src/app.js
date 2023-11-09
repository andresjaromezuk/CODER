import express, { json, urlencoded } from 'express'
import {engine} from 'express-handlebars'
import {apiRouter} from './router/apiRouter.js'
import {webRouter} from './router/webRouter.js'
import path from 'path'
import __dirname from './util.js'
import {Server} from 'socket.io'
//Express
const app = express()
const PORT = 8080

//Middlewares 
app.use(urlencoded({ extended: true }))
app.use(json())
app.engine('handlebars', engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
app.use('/static', express.static(path.join(__dirname, '../static')))

const server = app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})

//Levantamos IO Server y lo mandamos 
const ioServer = new Server(server)
app.use((req,res,next) => {
  req['io'] = ioServer
  next()
})

//Rutas
app.use('/api', apiRouter)
app.use('/', webRouter)
