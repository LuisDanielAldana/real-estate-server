var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);
router.get('/find',userController.findUsers)

module.exports = router;
