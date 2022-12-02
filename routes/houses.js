var express = require('express');
var router = express.Router();

//Para guardar imagenes
const multer = require('multer')
const storage = multer.diskStorage({});
const upload = require("../utils/multer");


const houseController = require('../controllers/house.controller')

/* GET houses listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create',upload.single("image"), houseController.createHouse);

router.post('/find',houseController.findHouses);

router.post('/favorites',houseController.findFavorites)

router.post('/addFavorite',houseController.addFavorite)

router.post('/removeFavorite',houseController.removeFavorite)

router.post('/editHouse', houseController.editHouse)

router.post('/delete', houseController.deleteHouse)

router.post('addImage',upload.single("image"),houseController.addImage)

router.post('deleteImage',houseController.deleteImage)

module.exports = router;
