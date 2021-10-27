const bcrypt = require('bcryptjs')

/**
 * Crypt password of user (password, saltValue)
 * @param {string} password User password
 * @param {number} saltValue Salt value for crypt password
 * @returns {{passwordHash}} return passwordHash
 */

const hashPassword = (password, saltValue = 10) => {
  const salt = bcrypt.genSaltSync(saltValue)
  const passwordHash = bcrypt.hashSync(password, salt)

  return passwordHash
}

module.exports = {
  hashPassword,
}
