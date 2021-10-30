const { IMAGES_TYPE } = require('../config/imagesTypes')

const checkFormatImage = (req, res, next) => {
  const { avatar } = req.files
  const { name } = avatar

  const [formatFile] = name.split('.').slice(-1)
  const isCorrectFormat = IMAGES_TYPE.includes(formatFile)

  if (!isCorrectFormat) {
    return res.status(400).json({
      error: `Is not a corrert image format. Must like: ${IMAGES_TYPE} `,
    })
  }

  next()
}

module.exports = {
  checkFormatImage,
}
