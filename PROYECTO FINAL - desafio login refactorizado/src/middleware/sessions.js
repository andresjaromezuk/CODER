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
