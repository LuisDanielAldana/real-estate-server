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

const HouseSchema = new mongoose.Schema(
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
        //houseNumber, street, district, city, postalCode, County, Country
        address: {
            type: String,
            required: true,
            default:""
        },
        location:{
            type: locationSchema,
            required: true
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
        //Casa o departamento
        buildingType: {
            type: String,
            required: true,
            default:""
        },
        //Rentada, disponible, vendida
        availability:{
            type: String,
            required: true,
            default:""
        },
        extraConstruction: {
            type: [extraConstructionSchema],
            required: true
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
        }

    }
);

const House = mongoose.model('House',HouseSchema);

module.exports = {
    House
}
