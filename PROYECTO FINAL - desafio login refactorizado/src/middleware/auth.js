export function webUserLogged(req, res, next){
    if (!req.isAuthenticated()){
        return res.redirect('/sessions/login')
    }
    next()
}

export function apiUserLogged(req, res, next){
    if (!req.isAuthenticated()){
        return res.status(400).json({ status: 'error', message: 'Debe iniciar sesion' })
    }
    next()
}