var express = require('express');
var router = express.Router();

const houseController = require('../controllers/house.controller')

/* GET houses listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', houseController.createHouse);

router.post('/find',houseController.findHouses);

router.post('/favorites',houseController.findFavorites)

router.post('/addFavorite',houseController.addFavorite)

router.post('/removeFavorite',houseController.removeFavorite)

router.post('/editHouse', houseController.editHouse)

router.post('/delete', houseController.deleteHouse)


module.exports = router;
