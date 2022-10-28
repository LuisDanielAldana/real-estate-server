const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const childrenSchema = new Schema(
    {
        NombreConstruccion: String,
        require: true
    },
    {
        TipoConstruccion: String,
        require: true
    }
)

const HouseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        image: {
            type: [String],
            required: false
        },
        description: {
            type: String,
            required: true
        },
        building_type: {
            type: String,
            required: true
        },
        construccion: {
            type: [childrenSchema],
            required: false
        },

    }
);

const House = mongoose.model('User',HouseSchema);

module.exports = {
    House
}
