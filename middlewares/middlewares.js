const REDIS_PORT = 6379;

const redis = require('redis')
const client = redis.createClient(REDIS_PORT)

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

module.exports = {
    cache
}
