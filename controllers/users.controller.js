const { hashPassword } = require('../helpers/hashPassword')
const User = require('../models/user')
const { nanoid } = require('nanoid')

const getUsers = (_, res) => {
  res.json({
    users: 'madeval',
  })
}

const createUser = async (req, res) => {
  const { password, email, role, ...userData } = req.body
  // crypt password
  const { passwordHash } = hashPassword(password)
  const code = role === 'TRAINER' ? await nanoid(5) : null

  try {
    const existSameUser = await User.findOne({ email })

    if (existSameUser)
      return res
        .status(400)
        .json({ error: 'Was exist this user with the same email' })

    const newUser = new User({
      ...userData,
      email,
      role,
      code,
      password: passwordHash,
    })

    await newUser.save()

    res.json({ user: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

module.exports = {
  getUsers,
  createUser,
}
