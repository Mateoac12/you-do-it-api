const sportPlayerValidator = async (req, res, next) => {
  const { isTrainer } = req

  if (isTrainer) {
    return res.status(401).json({
      error: 'User not permission',
    })
  }

  next()
}

module.exports = {
  sportPlayerValidator,
}
