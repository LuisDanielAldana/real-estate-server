var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const middlewareController = require('../middlewares/middlewares')
const basicAuth = require("express-basic-auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', basicAuth({
  users: {'admin':'supersecret'}
}), userController.createUser);

router.post('/find',authController.validateJWT ,userController.findUsers);

router.post('/login', userController.login);

router.post('/delete', basicAuth({
  users: {'admin':'supersecret'}
}), userController.deleteUser);

router.post('/addFavorite', userController.addFavorite);

router.post('/removeFavorite', userController.removeFavorite);

router.post('/findFavorites',middlewareController.cache,  userController.findFavorites);

router.post('/editUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.editUser)

router.post('/banUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.banUser)

router.post('/unbanUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.unbanUser)

router.post('/findByUsername',basicAuth({
  users: {'admin':'supersecret'}
}),userController.findByUsername )


module.exports = router;
