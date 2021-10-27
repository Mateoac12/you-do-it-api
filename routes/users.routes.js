const { Router } = require('express')
const { body } = require('express-validator')
const { getUsers, createUser } = require('../controllers/users.controller')

const router = Router()

// middlewares
const { validatorErrors } = require('../middlewares/validatorErrors')

router.get('/', [validatorErrors], getUsers)

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

module.exports = router
