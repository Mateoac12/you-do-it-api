const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Database connected')
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  dbConnection,
}
