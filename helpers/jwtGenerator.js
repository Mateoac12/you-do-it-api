const jwt = require('jsonwebtoken')

const jwtGenerator = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_KEY,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) reject(err.message)
        resolve(token)
      }
    )
  })
}

module.exports = {
  jwtGenerator,
}
