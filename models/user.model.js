const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
       firstname: {
           type:String,
           required:true,
           default:""
       } ,
        lastname: {
           type: String,
            required: true,
            default:""
        },
        username: {
           type: String,
            default:""
        },
        password: {
           type: String,
            required: true,
            default:""
        },
        email: {
           type: String,
            required: true,
            default:""
        },
        phone: {
           type: String,
            required: true,
            default:""
        },
        favorites: {
           type: [mongoose.Schema.Types.ObjectId],
            ref: "House",
            required:false
        },
        houses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "House",
            required:false
        }
    }
);


const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}

