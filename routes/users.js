var express = require('express');
var router = express.Router();
const redis = require('redis')

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

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

router.post('/findFavorites', findFavorites);

router.post('/editUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.editUser)

router.post('/banUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.banUser)

router.post('/unbanUser',basicAuth({
  users: {'admin':'supersecret'}
}), userController.unbanUser)


module.exports = router;

//Find favorites function
async function findFavorites(req, res){
  let isCached = false;
  const user_id = req.body.user_id
  try {
    const cacheResults = await redisClient.get(user_id);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      const houses = await User.findOne(
          {_id: user_id},
          {favorites: 1}).populate({path: "favorites", model: "House"})
      await redisClient.set(user_id, JSON.stringify(houses));
    }
    res.status(200).json({
      message: "Favorite houses",
      obj: houses
    })
  } catch (e) {
    res.status(400).json({
      message: "Can't find favorite houses",
      obj: null
    })
  }
}

//Cache middleware
function cache (req, res, next) {
  const user_id = req.body._id
  client.get(user_id, (err, data) => {
    if(err) throw err;
    if (data !== null){
      res.send(user_id, data)
    } else {
      next()
    }
  })
}
