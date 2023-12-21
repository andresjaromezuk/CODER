import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GithubStrategy} from 'passport-github2'
import {dbUser} from '../dao/models/user.mongoose.js'
import {githubClientId, githubClientSecret, githubCallbackUrl} from '../config/github.config.js'

passport.use('login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) =>{
  try {
    const user = await dbUser.login(email, password)
    done(null, user)
  } catch (error) {
    return done(null, false, error.message)
  }
}))

passport.use('register', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
}, async (req, _u, _p, done)=>{
  try{
    const user = await dbUser.register(req.body)
    done(null, user)
  } catch (error){
    done(null, false, error.message)
  }
}))

passport.use('github', new GithubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  console.log(profile)

  const user = await dbUser.findOne({ email: profile.username })
  if (user) {
    return done(null, {
      ...user.publicInfo(),
      rol: 'usuario'
    })
  }

  try {
    const registered = await dbUser.create({
      email: profile.username,
      password: '(sin especificar)',
      firstName: profile.displayName,
      lastName: '(sin especificar)',
      age: 0
    })
    done(null, {
      ...registered.publicInfo(),
      rol: 'usuario'
    })
  } catch (error) {
    done(error)
  }

}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function authenticate(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}