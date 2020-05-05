const TodoModel = require('./model')
const Utils = require('../utils/utils')
const LogModel = require('../log/model')
const moment = require('moment')

module.exports = class TodoController {
  //  获取用户的todo列表
  static async getTodoList (req, res, next) {
    let status = req.query.status
    if (status) {
      status = status.split(',').map(num => +num)
    }
    try {
      let todos = await TodoModel.getTodoList(req.user.id, status)
      res.send(Utils.sealRes(todos))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '查询数据时发生错误'))
    }
  }

  //  添加一条todo
  static async addTodo (req, res, next) {
    if (!req.body.title) {
      res.send(Utils.seal('PARAMS_MISS', 'todo标题必填'))
      return
    }
    let params = {
      title: req.body.title,
      status: TodoModel.PREPARE,
      user_id: req.user.id,
      update_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }
    try {
      let result = await TodoModel.addTodo(params)
      //  记录日志
      LogModel.addLog(req.user.id, LogModel.MODULE_TODO, LogModel.OPERATE_ADD, `${req.user.username}添加一条事件`, Utils.getIp(req))
      res.send(Utils.sealRes(result.id))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '插入数据时发生错误'))
    }   
  }

  //  更新todo状态
  static async updateTodoStatus (req, res, next) {
    let id = req.params.id, status = req.params.status
    if (!id || !status) {
      res.send(Utils.seal('PARAMS_ERROR', '缺少必要参数'))
      return
    }
    try {
      await TodoModel.setTodoStatus(id, status)
      LogModel.addLog(req.user.id, LogModel.MODULE_TODO, LogModel.OPERATE_UPDATE, `${req.user.username}修改事件（${id}）状态成功`, Utils.getIp(req))
      res.send(Utils.sealRes({}))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '更新状态时发生错误'))
    }
  }

  //  更新todo信息
  static async updateTodo (req, res, next) {
    let id = req.params.id, title = req.body.title
    if (!id || !title) {
      res.send(Utils.seal('PARAMS_ERROR', '缺少必要参数'))
      return
    }
    try {
      await TodoModel.updateTodo(id, title)
      LogModel.addLog(req.user.id, LogModel.MODULE_TODO, LogModel.OPERATE_UPDATE, `${req.user.username}修改事件（${id}）信息成功`, Utils.getIp(req))
      res.send(Utils.sealRes({}))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '更新todo事件时发生错误'))
    }
  }
}