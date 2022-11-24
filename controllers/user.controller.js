const User = require('../models/user.model').User;

async function createUser(req, res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.req.body.email;
    const phone = req.body.phone

    if (firstname && lastname && username && password && email){
        try {
            const newUser = await new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                email: email,
                phone: phone
            }).save();
            res.status(200).json({
                message: "User Created",
                obj: newUser
            })
        } catch (err){
            console.error(err);
            res.status(400).json({
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
        res.status(400).json({
            message: "Something happened when finding user",
            obj: null
        })
    }
}
async function login(req, res){
    const username = req.body.user;
    const password = req.body.pass;
    try{
            const user = await User.findOne({
                username: username,
                password: password
            })
        if(user) {
            res.status(200).json({
                message: "Has iniciado sesion",
                obj: user,
            })
        }
        else{
            console.log("No")
            res.status(400).json({
                message:"Can't find user",
                obj:null
            })
        }

    }catch (e){
        console.log(e)
        res.status(400).json({
            message:"Can't find user",
            obj:null
        })
    }
}

async function removeUser(req, res){

}

module.exports = {
    createUser,
    findUsers,
    login
}
