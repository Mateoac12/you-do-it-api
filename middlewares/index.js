const { avatarFileExist } = require('./avatarFileExit')
const { checkFormatImage } = require('./checkFormatImage')
const { validatorErrors } = require('./validatorErrors')
const { validateToken } = require('./validateToken')
const { trainerValidator } = require('./trainerValidator')
const { sportPlayerValidator } = require('./sportPlayerValidator')

module.exports = {
  avatarFileExist,
  checkFormatImage,
  validatorErrors,
  validateToken,
  trainerValidator,
  sportPlayerValidator,
}
