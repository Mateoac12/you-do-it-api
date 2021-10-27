require('dotenv').config()
const cors = require('cors')
const express = require('express')

const app = express()

// database connection
const { dbConnection } = require('./database/config')
dbConnection()

const PORT = process.env.PORT || 8080

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/users', require('./routes/users.routes'))

app.listen(PORT, () => {
  console.log(`Connecting from http://localhost:${PORT}`)
})
