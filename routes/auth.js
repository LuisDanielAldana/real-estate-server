var express = require('express');
var router = express.Router();
const basicAuth = require ('express-basic-auth')

const authController = require('../controllers/auth.controller')

router.get('/get-jwt', basicAuth({
    users: {'admin':'supersecret'}
}), authController.generateJWT)

module.exports = router
