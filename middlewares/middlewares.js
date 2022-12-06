const client = require('../controllers/redis.controller').client

function cache (req, res, next) {
    const user_id = req.body.user_id
    client.get(user_id, (err, data) => {
        if(err) throw err;
        if (data !== null){
            res.return(data)
        } else {
            next()
        }
    })
}

module.exports = {
    cache
}
