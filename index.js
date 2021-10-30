require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

// database connection
const { dbConnection } = require('./database/config')
dbConnection()

const PORT = process.env.PORT || 8080

// middlewares
app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)

// routes
app.use('/users', require('./routes/users.routes'))
app.use('/auth', require('./routes/auths.routes'))
app.use('/classes', require('./routes/classes.routes'))
app.use('/search', require('./routes/searches.routes'))

app.listen(PORT, () => {
  console.log(`Connecting from http://localhost:${PORT}`)
})
