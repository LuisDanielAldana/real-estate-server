const House = require("../models/house.model").House;
const DeleteUser = require("../models/deletedUser.model").DeletedUser;
const User = require('../models/user.model').User;
const authController = require('../controllers/auth.controller');


// const redis = require('redis')
// const client = redis.createClient()

async function createUser(req, res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone

    if (firstname && lastname && username && password && email && phone){
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
            if(user.banned == true){
                res.status(402).json({
                    message: "User is banned",
                    obj: user
                })
            } else {
                const token = authController.generateJWT({username})
                res.status(200).json({
                    message: "Has iniciado sesion",
                    obj: user,
                    authToken: token
                })
            }
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
async function deleteUser(req, res){
    const _id = req.body._id
    try{
        const userTodelete = await User.findOne(
            {_id: _id}
        )
        console.log(userTodelete)
        const backupUser = await new DeleteUser(
            {
                firstname: userTodelete.firstname,
                lastname: userTodelete.lastname,
                username: userTodelete.username,
                password: userTodelete.password,
                email: userTodelete.email,
                phone: userTodelete.phone
            }
        ).save()
        const deletedUser = await User.deleteOne(
            {_id: _id}
        )
        res.status(200).json({
            message: "user Deleted",
            obj: deletedUser
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: "Something happened when deleting user",
            obj: null
        })
    }
}
async function addFavorite(req, res){
    try {
        const us_id = req.body.us_id
        const house_id = req.body.house_id
        const userFavorited = await User.updateOne(
            {_id: us_id},
            {$push: {favorites: house_id}}
        )
        res.status(200).json({
            message: "House added to Favorites",
            obj: userFavorited
        })
    } catch (e){
        res.status(400).json({
            message: "Can't add house to favorites",
            obj: null
        })
    }

}
async function removeFavorite(req, res){
    try {
        const us_id = req.body.us_id
        const house_id = req.body.house_id
        const userFavorited = await User.updateOne(
            {_id: us_id},
            {$pull: {favorites: house_id}}
        )
        res.status(200).json({
            message: "House removed from Favorites",
            obj: userFavorited
    })
    } catch (e){
        res.status(400).json({
            message: "Can't remove house from favorites",
            obj: null
        })
    }
}
async function findFavorites(req, res){
    const user_id = req.body.user_id
    try {
        const houses = await User.findOne(
            {_id:user_id},
            {favorites:1}).populate({path:"favorites", model:"House"})
        // await client.setEx(user_id, houses)
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
async function editUser(req, res){
    const _id = req.body._id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone
    try {
        const editedUser = await User.updateOne(
            {_id: _id},
            {
                firstname: firstname,
                lastname:lastname,
                username: username,
                password:password,
                email:email,
                phone:phone
            }
        )
        res.status(200).json({
            message: "User succesfully edited",
            obj: editedUser
        })
    } catch (e) {
        res.status(400).json({
            message: "Cant edit user",
            obj: null
        })
    }
}
async function banUser(req, res){
    const _id = req.body._id;
    try {
        const user = await User.updateOne(
            {_id: _id},
            {banned:true}
        )
        res.status(200).json({
            message: "User banned",
            obj: user
        })
    } catch (e) {
        res.status(400).json({
            message: "Error banning user",
            obj: null
        })
    }
}
async function unbanUser(req, res){
    const _id = req.body._id;
    try {
        const user = await User.updateOne(
            {_id: _id},
            {banned:false}
        )
        res.status(200).json({
            message: "User unbanned",
            obj: user
        })
    } catch (e) {
        res.status(400).json({
            message: "Error unbanning user",
            obj: null
        })
    }
}
async function findByUsername(req, res) {
    const username = req.body.username
    try {
        const users = await User.find(
            {username: username},
            {
                _id:0,
                username: 1}
        )
        res.status(200).json({
            message: "Al users by username",
            obj: users
        })
    } catch (e) {
        res.status(500).json({
            message: "Can't find users",
            obj: null
        })
    }
}

module.exports = {
    createUser,
    findUsers,
    login,
    deleteUser,
    addFavorite,
    removeFavorite,
    findFavorites,
    editUser,
    banUser,
    unbanUser,
    findByUsername
}
