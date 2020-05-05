// var express = require('express');
// var router = express.Router();

const routers = [
  {
    pre: 'user',
    router: require('../business/user/index')
  },
  {
    pre: 'todo',
    router: require('../business/todo/index')
  },
  {
    pre: 'user/data',
    router: require('../business/userData/index')
  },
  {
    pre: 'open/page',
    router: require('../business/openPage/index')
  }
]

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = class Routers {
  static register (app) {
    routers.forEach(item => {
      app.use('/' + item.pre, item.router)
    })
  }
}
