const UserDataController = require('./controller')
const router = require('express').Router()
const check = require('./check')

router.get('/dau', check.isAdmin, UserDataController.getDAU)
router.get('/weeks',check.isAdmin, UserDataController.getWeeks)

module.exports = router