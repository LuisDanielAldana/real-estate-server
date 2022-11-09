const jwt = require("jsonwebtoken");
const config = require("../config").configuration

async function generateJWT(req,res){
    try {
        const token = await jwt.sign({}, config.jwt.secretKey);
        res.status(200).json(
            {
                data: token
            }
        )
    }
    catch (e){
        console.error(e)
        res.status(500).json(
            {
                message: e.message
            }
        )
    }
}

module.exports = {
    generateJWT
}
