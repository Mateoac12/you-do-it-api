const User = require('../models/user')

const searchGym = async (req, res) => {
  const { gym } = req.query
  const regex = new RegExp(gym, 'i')

  try {
    const gymsFounds = await User.find({
      displayName: regex,
      $and: [{ status: true }, { role: 'TRAINER' }],
    })

    res.json({
      results: gymsFounds,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    })
  }
}

module.exports = {
  searchGym,
}
