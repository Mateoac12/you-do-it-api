const User = require('../models/user')

const trainerValidator = async (req, res, next) => {
  let { isTrainer } = req

  try {
    if (typeof isTrainer === 'undefined') {
      const foundUser = await User.findById(req.body.creator)
      isTrainer = foundUser.state
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    })
  }

  if (!isTrainer) {
    return res.status(401).json({
      error: 'User hasn`t permission',
    })
  }

  next()
}

module.exports = {
  trainerValidator,
}
