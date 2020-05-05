const Todo = require('../sequelize/todo')
const moment = require('moment')
const Op = require('sequelize').Op

class TodoModel {
  static getTodoList (id, status) {
    let param = {
      user_id: id
    }
    if (status) {
      param.status = {
        [Op.in]: status
      }
    }
    return new Promise((resolve, reject) => {
      Todo.findAll({
        where: param,
        'order': [
          ['status'],
          ['update_time', 'DESC'],
          ['id', 'DESC']
        ]
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static addTodo (params) {
    return new Promise((resolve, reject) => {
      Todo.create(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setTodoStatus (id, status) {
    return new Promise((resolve, reject) => {
      Todo.update(
        {
          status: status,
          update_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        },
        { where: { id: id } }
      ).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static updateTodo (id, title) {
    return new Promise((resolve, reject) => {
      Todo.update(
        {
          title: title,
          update_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        },
        { where: { id: id } }
      ).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

TodoModel.PREPARE = 0
TodoModel.FINISH = 1
TodoModel.DISCARD = 2

module.exports = TodoModel