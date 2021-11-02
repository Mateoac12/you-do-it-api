const { hashPassword } = require('../helpers/hashPassword')
const User = require('../models/user')
const { nanoid } = require('nanoid')
const cloudinary = require('cloudinary').v2
const { jwtGenerator } = require('../helpers/jwtGenerator')

// cloudinary config
cloudinary.config(process.env.CLOUDINARY_URL)

const createUser = async (req, res) => {
  const { password, email, role, ...userData } = req.body
  // crypt password
  const passwordHash = hashPassword(password)
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

    try {
      await newUser.save()

      const tokenID = await jwtGenerator({ uid: newUser.id })
      res.json({
        user: newUser,
        tokenID,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

const deleteUser = async (req, res) => {
  const { uid } = req.body

  try {
    const foundUser = await User.findByIdAndUpdate(uid, { state: false })

    if (!foundUser) {
      return res.status(400).json({
        error: 'Not user found',
      })
    }

    if (foundUser.state === false) {
      return res.status(400).json({
        error: 'User was deleted',
      })
    }

    res.json({
      user: `User ${foundUser.displayName} was deleted`,
    })
  } catch (error) {}
}

const uploadUserImage = async (req, res) => {
  const { tempFilePath } = req.files.avatar
  const { uid } = req.query

  const { state, avatar } = await User.findById(uid)

  if (!state) {
    return res.status(400).json({
      error: 'Impossible upload this user',
    })
  }

  // add new avatar in cloudinary
  const newAvatar = await cloudinary.uploader.upload(tempFilePath, {
    folder: 'YouDoIt/users/avatar',
  })

  // include new avatar in user DB
  const userUpload = await User.findByIdAndUpdate(
    uid,
    {
      avatar: newAvatar.secure_url,
    },
    { new: true }
  )

  // remove old avatar
  if (avatar) {
    const [typeFile] = avatar.split('/').slice(-1)
    const [normalizeFile] = typeFile.split('.')

    cloudinary.uploader.destroy(`YouDoIt/users/avatar/${normalizeFile}`)
  }

  res.json({ user: userUpload })
}

const uploadUserName = async (req, res) => {
  const { displayName, uid } = req.body

  const uploadUser = await User.findByIdAndUpdate(
    uid,
    { displayName },
    { new: true }
  )

  res.json({
    user: uploadUser,
  })
}

// add gym subscription
const addGymSubscription = async (req, res) => {
  const { nameGym, gymCodeID } = req.body
  const { uid: currentUserID } = req

  try {
    const foundGym = await User.findOne({
      code: gymCodeID,
      displayName: nameGym,
    })

    if (!foundGym || !foundGym?.state) {
      return res.status(400).json({
        error: 'Gym not valid in database',
      })
    }

    const { id } = foundGym

    const apdateUser = await User.findByIdAndUpdate(
      currentUserID,
      {
        $addToSet: { gymPartner: id },
      },
      { new: true }
    ).populate('gymPartner')

    res.json({
      user: apdateUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    })
  }
}

const removeSubscription = async (req, res) => {
  const { gymCodeID, nameGym } = req.body
  const { uid: currentUserID } = req

  try {
    const foundGym = await User.findOne({
      code: gymCodeID,
      displayName: nameGym,
    })

    if (!foundGym || !foundGym?.state) {
      return res.status(400).json({
        error: 'Gym not valid in database',
      })
    }

    const { id } = foundGym

    const apdateUser = await User.findByIdAndUpdate(
      currentUserID,
      {
        $pull: { gymPartner: id },
      },
      { new: true }
    ).populate('gymPartner')

    res.json({
      user: apdateUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    })
  }
}

module.exports = {
  createUser,
  deleteUser,
  uploadUserImage,
  uploadUserName,
  addGymSubscription,
  removeSubscription,
}
