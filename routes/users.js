var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);

router.get('/find', authController.validateJWT, userController.findUsers);

router.post('/login',userController.login)


module.exports = router;
