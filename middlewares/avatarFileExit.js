const avatarFileExist = (req, res, next) => {
  const { files } = req
  const avatar = files?.avatar

  const isFileNotExist = !files || Object.keys(files).length === 0 || !avatar

  if (isFileNotExist) {
    return res.status(400).json({
      error: 'Image not exist',
    })
  }

  next()
}

module.exports = {
  avatarFileExist,
}
