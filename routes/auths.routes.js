const { Router } = require('express')
const { body } = require('express-validator')
const { loginUser } = require('../controllers/auths.controller')
const { validatorErrors } = require('../middlewares')

const router = Router()

router.post(
  '/login',
  [
    body('email', 'Must type a email').isEmail(),
    body('password', 'Must type a password').notEmpty(),
    validatorErrors,
  ],
  loginUser
)

module.exports = router
