
// get .env config
const dotenvConf = require('dotenv').config()
if (dotenvConf.error) throw dotenvConf.error

// create the server
const express = require('express')
const app = express()

// add routes
app.get('/', (req, res) => {
  res.send('you just hit the home page\n')
})

// launch the server
app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`-> Listening on port ${process.env.SERVER_PORT || 3000}...\n`)
})
