const jwt = require("jsonwebtoken");
const config = require("../config").configuration

async function generateJWT(){
        return await jwt.sign({}, config.jwt.secretKey);
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
        await jwt.verify(authToken, config.jwt.secretKey);
        next()
;    } catch (e){
        res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
}

module.exports = {
    generateJWT,
    validateJWT
}
