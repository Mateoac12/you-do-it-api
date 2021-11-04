const bcryptjs = require('bcryptjs')
const { jwtGenerator } = require('../helpers/jwtGenerator')
const User = require('../models/user')

const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
    .populate('gymPartner')
    .populate('classes')

  if (!user || !user?.state) {
    return res.status(400).json({
      error: 'User not exist',
    })
  }

  const { password: passwordHash } = user
  const isSamePassword = bcryptjs.compareSync(password, passwordHash)

  if (!isSamePassword) {
    return res.status(400).json({
      error: 'Incorrect password or login with signIn with Google',
    })
  }

  try {
    const tokenID = await jwtGenerator({ uid: user.id })
    res.json({
      user,
      tokenID,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error,
    })
  }
}

module.exports = {
  loginUser,
}
