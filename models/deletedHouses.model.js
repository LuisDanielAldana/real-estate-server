const mongoose = require('mongoose');

const extraConstructionSchema = new mongoose.Schema(
    {
        buildingName: {
            type: String,
            required: true,
            default:""
        },
        constructionType: {
            type: String,
            required: true,
            default:""
        }
    }
)

const locationSchema = new mongoose.Schema(
    {
        lat: {
            type: Number,
            required: true,
            default:""
        },
        lng: {
            type: Number,
            required: true,
            default:""
        }
    }
)

const deletedHouseSchema = new mongoose.Schema(
    {
        ownerName: {
            type: String,
            required: true,
            default:""
        },
        ownerEmail: {
            type: String,
            required: true,
            default:""
        },
        ownerPhone: {
            type: String,
            required: true,
            default:""
        },
        houseHeader: {
            type: String,
            required: true,
            default:""
        },
        description: {
            type: String,
            required: true,
            default:""
        },
        address: {
            type: String,
            required: true,
            default:""
        },
        location:{
            type: locationSchema,
            required: true,
        },
        image: {
            type: [String],
            required: false,
            default:[""]
        },
        //Venta o Renta
        dealType:{
            type: String,
            required: true,
            default:""
        },
        price: {
            type: Number,
            required: true,
            default:""
        },
        buildingType: {
            type: String,
            required: true,
            default:""
        },
        availability:{
            type: String,
            required: true,
            default:""
        },
        extraConstruction: {
            type: [extraConstructionSchema],
            required: true,
            default:""
        },
        bedrooms: {
            type: Number,
            required: true,
            default:""
        },
        bathrooms: {
            type: Number,
            required: true,
            default:""
        },
        terrainArea: {
            type: Number,
            required: true,
            default:""
        },
        buildingArea: {
            type: Number,
            required: true,
            default:""
        },
        date: {
            type: Date,
            default: Date.now
        },
    }
);

const deletedHouse = mongoose.model('deletedHouse',deletedHouseSchema);

module.exports = {
    deletedHouse
}
