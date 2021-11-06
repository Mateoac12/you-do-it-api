const { Router } = require('express')
const { body } = require('express-validator')
const {
  createClass,
  addSportPlayer,
  getClasses,
} = require('../controllers/classes.controller')
const {
  validatorErrors,
  validateToken,
  trainerValidator,
  sportPlayerValidator,
} = require('../middlewares')

const router = Router()

router.get(
  '/',
  [
    validateToken,
    body('uid', 'User ID is required').notEmpty(),
    body('uid', 'User ID must be a correct ID').isMongoId(),
    validatorErrors,
  ],
  getClasses
)

router.post(
  '/add',
  [
    validateToken,
    trainerValidator,
    body('creator', 'Is required a correct ID').isMongoId(),
    body('activity', 'Activity is required').notEmpty(),
    body('limitQuotas', 'Required to be a number').isNumeric().notEmpty(),
    body('date', 'Required a date').isNumeric().notEmpty(),
    validatorErrors,
  ],
  createClass
)

router.put(
  '/',
  [
    validateToken,
    sportPlayerValidator,
    body('uid', 'User ID is required').isMongoId(),
    body('sportClassID', 'Is required a class ID').isMongoId(),
    validatorErrors,
  ],
  addSportPlayer
)

module.exports = router
