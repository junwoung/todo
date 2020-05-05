const User = require('../sequelize/user')

class UserModel {
  static getUserByName (name) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { username: name }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static createUser (params) {
    return new Promise((resolve, reject) => {
      User.create(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static countTotalUsers (params) {
    return new Promise((resolve, reject) => {
      User.count().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

UserModel.ADMIN = 0
UserModel.NORMAL = 1

module.exports = UserModel