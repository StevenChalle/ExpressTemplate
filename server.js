
// modules importation
const dotenvConf = require('dotenv').config()
if (dotenvConf.error) throw dotenvConf.error
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const uuid = require('uuid/v4')

// create the server
const app = express()

// add & configure middleware
app.use(session({
  genid: (req) => {
    return uuid()
  },
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// add routes
app.get('/', (req, res) => {
  res.send(`you just hit the home page, your req.sessionID is : ${req.sessionID}`)
})

// launch the server
app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`-> Listening on port ${process.env.SERVER_PORT || 3000}...\n`)
})
