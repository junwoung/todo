const router = require('express').Router()
const ctrl = require('./controller')
const check = require('./check')

router.post('/report', ctrl.addReport)
router.get('/avg', check.isAdmin, ctrl.getAvg)

module.exports = router