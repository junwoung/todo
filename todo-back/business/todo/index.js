const router = require('express').Router()
const ctrl = require('./controller')

router.get('/list', ctrl.getTodoList)
router.post('/add', ctrl.addTodo)
router.put('/:id/status/:status', ctrl.updateTodoStatus)
router.put('/:id/edit', ctrl.updateTodo)

module.exports = router