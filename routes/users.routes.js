const { Router } = require('express')
const { body, query } = require('express-validator')

const router = Router()

const {
  createUser,
  deleteUser,
  uploadUserImage,
  uploadUserName,
  addGymSubscription,
  removeSubscription,
} = require('../controllers/users.controller')

// middlewares
const {
  avatarFileExist,
  checkFormatImage,
  validatorErrors,
  validateToken,
  sportPlayerValidator,
} = require('../middlewares')

router.post(
  '/',
  [
    body('displayName', 'Name is empty').notEmpty(),
    body('email', 'Must be a email').isEmail(),
    body('password', 'Must be a strong password').isStrongPassword(),
    body('role', 'Invalid Role').isIn(['SPORTPLAYER', 'TRAINER']),
    validatorErrors,
  ],
  createUser
)

router.delete(
  '/',
  [
    validateToken,
    body('uid', 'Is not a correct id').isMongoId(),
    validatorErrors,
  ],
  deleteUser
)

router.put(
  '/',
  [
    validateToken,
    body('displayName', 'Must have words').notEmpty(),
    body('uid', 'Must be uid').isMongoId(),
    validatorErrors,
  ],
  uploadUserName
)

router.put(
  '/avatar',
  [
    validateToken,
    query('uid', 'Must be correct userId').isMongoId(),
    avatarFileExist,
    checkFormatImage,
    validatorErrors,
  ],
  uploadUserImage
)

router.put(
  '/add-subscription',
  [
    validateToken,
    sportPlayerValidator,
    body('gymCodeID', 'Code ID is required').notEmpty(),
    body('nameGym', 'Gym`s name is required').notEmpty(),
    validatorErrors,
  ],
  addGymSubscription
)

router.delete(
  '/remove-subscription',
  [
    validateToken,
    sportPlayerValidator,
    body('gymCodeID', 'Code ID is required').notEmpty(),
    body('nameGym', 'Gym`s name is required').notEmpty(),
    validatorErrors,
  ],
  removeSubscription
)

module.exports = router
