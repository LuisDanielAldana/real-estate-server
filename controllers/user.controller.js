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
async function findUsers(req, res){
    try {
        const user = await User.find({})
        res.status(200).json({
            message: "All users in DB:",
            obj: user
        })
    } catch (err){
        console.error("Error Finding User")
        res.status(500).json({
            message: "Something happened when finding user",
            obj: null
        })
    }
}
async function login(req, res){
    const userName = req.body.user;
    const password = req.body.pass;
    try{
            const user = await User.findOne({
                userName: userName,
                password: password
            })
        if(user) {
            res.status(200).json({
                message: "Has iniciado sesion",
                obj: user
            })
        }
        else{
            console.log("No")
            res.status(500).json({
                message:"Can't find user",
                obj:null
            })
        }

    }catch (e){
        console.log(e)
        res.status(500).json({
            message:"Can't find user",
            obj:null
        })
    }
}

module.exports = {
    createUser,
    findUsers,
    login
}
