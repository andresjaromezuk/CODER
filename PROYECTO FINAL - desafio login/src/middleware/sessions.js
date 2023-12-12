import session from 'express-session'
import MongoStore from 'connect-mongo'
import { MONGODB_CNX_STR } from '../config/mongodb.config.js'

const store = MongoStore.create({
    mongoUrl: MONGODB_CNX_STR,
    ttl: 60 * 60 * 24 // 1d
})

export const sessions = session({
    store,
    secret: "PalabraUltraSecreta",
    resave: false,
    saveUninitialized: false
})

export function webUserLogged(req, res, next){
    if (!req.session.user){
        return res.redirect('/sessions/login')
    }
    next()
}

export function apiUserLogged(req, res, next){
    if (!req.session.user){
        return res.status(400).json({ status: 'error', message: 'Debe iniciar sesion' })
    }
    next()
}