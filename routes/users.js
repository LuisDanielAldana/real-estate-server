var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);

router.post('/find',authController.validateJWT ,userController.findUsers);

router.post('/login', userController.login);

router.post('/delete',userController.deleteUser);

router.post('/addFavorite', userController.addFavorite);

router.post('/removeFavorite', userController.removeFavorite);

router.post('/findFavorites', userController.findFavorites);


module.exports = router;
