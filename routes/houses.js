var express = require('express');
var router = express.Router();

const houseController = require('../controllers/house.controller')

/* GET houses listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', houseController.createHouse);

router.get('/find',houseController.findHouses);

router.get('/favorites',houseController.findFavorites)

router.get('/addFavorite',houseController.addFavorite)

router.get('/removeFavorite',houseController.removeFavorite)

router.get('/editHouse', houseController.editHouse)


module.exports = router;
