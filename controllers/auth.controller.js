const jwt = require('jsonwebtoken');
const config = require("../config").configuration

function generateJWT(username) {
    return jwt.sign(username, process.env.ACCES_TOKEN_SECRET);
}

async function validateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    let authToken;

    if(authHeader && authHeader.length){
        const tokenParts = authHeader.split(' ');
        if(tokenParts.length == 2){
            authToken = tokenParts[1];
        }
    }
    try{
        await jwt.verify(authToken, process.env.ACCES_TOKEN_SECRET);
        next()
;    } catch (e){
        res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
}

// function validateJWT(req, res, next){
//    const bearerHeader = req.headers['authorization']
//    if(typeof bearerHeader !== 'undefined'){
//        const bearerToken = bearerHeader.split(' ')[1]
//        req.token = bearerToken
//        next()
//    } else {
//        res.status(403)
//    }
// }

module.exports = {
    generateJWT,
    validateJWT
}
