const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
       firstname: {
           type:String,
           required:true
       } ,
        lastname: {
           type: String,
            required: true
        },
        username: {
           username: String,

        },
        password: {
           type: String,
            required: true
        },
        email: {
           type: String,
            required: true
        },
        phone: {
           type: String,
            required: true
        },
        favorites: {
           type: [mongoose.Schema.Types.ObjectId],
            ref: "House"

        }
    }
);


const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}

