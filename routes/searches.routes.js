const { Router } = require('express')
const { searchGym } = require('../controllers/searches.controller')
const { validateToken, sportPlayerValidator } = require('../middlewares')

const router = Router()

router.get('/gym', [validateToken, sportPlayerValidator], searchGym)

module.exports = router
