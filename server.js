
// modules importation
const dotenvConf = require('dotenv').config()
if (dotenvConf.error) throw dotenvConf.error
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const uuid = require('uuid/v4')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./models/users.js')

const fakeUsers = [
  { id: '2f24vvg', email: 'test@test.com', password: 'password' }
]

// configure passport.js to use the local strategy
// should request db to authenticate
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was fakeUsers[0]
    const user = fakeUsers[0]
    if (email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
))

// describe passport serialization and deserialization
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id)
})
// should request db to fetch data
passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = fakeUsers[0].id === id ? fakeUsers[0] : false
  done(null, user)
})

// create & configure the server
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add & configure middlewares
app.use(session({
  genid: (req) => { return uuid() },
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// add routes
app.get('/', (req, res) => {
  res.send(`you just hit the home page, your req.sessionID is : ${req.sessionID}`)
})

app.post('/users/sign-up', (req, res, next) => {
  Users.findAll().then(users => {
    res.send(JSON.stringify(users))
  })
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { return res.send(info.message) }
    if (err) { return next(err) }
    if (!user) { return res.redirect('/login') }
    req.login(user, (err) => {
      if (err) { return next(err) }
      return res.send('You were authenticated & logged in!\n')
    })
  })(req, res, next)
})

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback')
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  if (req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

// launch the server
app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`-> Listening on port ${process.env.SERVER_PORT || 3000}...\n`)
})
