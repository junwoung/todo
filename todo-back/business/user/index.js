const router = require('express').Router()
const ctrl = require('./controller')
const check = require('./checkParams')

router.post('/login', check.login, ctrl.login)
router.post('/register', check.register, ctrl.register)
router.get('/logout/:id', ctrl.logout)

module.exports = router