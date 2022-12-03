const mongoose = require('mongoose');

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
            username: String,
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
            default:[""]

        },
        date: {
            type: Date,
            default: Date.now
        },
    }
);


const DeletedUser = mongoose.model('deletedUser',UserSchema);

module.exports = {
    DeletedUser
}

