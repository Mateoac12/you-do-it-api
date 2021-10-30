const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateToken = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(400).json({
      error: 'Token is missing',
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    const userFound = await User.findById(uid)

    if (!userFound || !userFound?.state) {
      return res.status(400).json({
        error: 'Incorrect token',
      })
    }

    req.uid = uid
    req.isTrainer = userFound.role === 'TRAINER'
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: error.message,
    })
  }

  next()
}

module.exports = {
  validateToken,
}
