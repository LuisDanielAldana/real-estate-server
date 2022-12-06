const redis = require('redis')
const client = redis.createClient({
    url: 'redis://default:MecY7yM8XZuShbTCYbekMRSPce9z0SUJ@redis-12190.c12.us-east-1-4.ec2.cloud.redislabs.com:12190'
});

client.on("error", function (error){
    console.log(error)
});

// client.set("key", "info");
//
// client.get("key", function (err, info){
//     console.log(info)
// });

module.exports = {
    client
}

