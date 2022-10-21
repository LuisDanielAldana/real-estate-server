const User = require('../models/user.model').User;
async function createUser(req, res){
    const firstName = req.body.fn;
    const lastName = req.body.ln;
    const userName = req.body.un;
    const password = req.body.pss;

    if (firstName && lastName && userName && password){
        try {
            const newUser = await new User({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: password
            }).save();
            res.status(200).json({
                message: "User Created",
                obj: newUser
            })
        } catch (err){
            console.error(err);
            res.status(500).json({
                message: "Something happened when storing user",
                obj: null
            })
        }
    } else {
        res.status(400).json({
            message: "Some parameters were missing",
            obj: null
        })
    }
}

module.exports = {
    createUser
}
