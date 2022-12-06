var express = require('express');
var router = express.Router();

//Para guardar imagenes
const multer = require('multer')
const storage = multer.diskStorage({});
const upload = require("../utils/multer");


const houseController = require('../controllers/house.controller')
const authController = require('../controllers/auth.controller')
const basicAuth = require("express-basic-auth");

/* GET houses listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create',upload.single("image"),basicAuth({
    users: {'admin':'supersecret'}
}), houseController.createHouse);

router.post('/find',authController.validateJWT, houseController.findHouses);

router.post('/favorites',authController.validateJWT,houseController.findFavorites)

router.post('/addFavorite',authController.validateJWT,houseController.addFavorite)

router.post('/removeFavorite',authController.validateJWT,houseController.removeFavorite)

router.post('/editHouse',basicAuth({
    users: {'admin':'supersecret'}
}), houseController.editHouse)

router.post('/delete',basicAuth({
    users: {'admin':'supersecret'}
}), houseController.deleteHouse)

router.post('/addImage',basicAuth({
    users: {'admin':'supersecret'}
}), upload.single("image"),houseController.addImage)

router.post('/deleteImage', basicAuth({
    users: {'admin':'supersecret'}
}),houseController.deleteImage)

router.post('/deletedHouses',basicAuth({
    users: {'admin':'supersecret'}
}),houseController.findDeletedHouses)

router.post('/recoverHouse',basicAuth({
    users: {'admin':'supersecret'}
}), houseController.recoverHouse)

module.exports = router;
