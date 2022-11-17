const mongoose = require('mongoose');

const extraConstructionSchema = new mongoose.Schema(
    {
        buildingName: {
            type: String,
            required: true
        },
        constructionType: {
            type: String,
            required: true
        }
    }
)

const locationSchema = new mongoose.Schema(
    {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    }
)

const HouseSchema = new mongoose.Schema(
    {
        ownerName: {
          type: String,
          required: true
        },
        ownerEmail: {
            type: String,
            required: true
        },
        ownerPhone: {
          type: String,
          required: true
        },
        houseHeader: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        //houseNumber, street, district, city, postalCode, County, Country
        address: {
            type: String,
            required: true
        },
        location:{
            type: locationSchema,
            required: true
        },
        image: {
            type: [String],
            required: false
        },
        //Venta o Renta
        dealType:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        //Casa o departamento
        buildingType: {
            type: String,
            required: true
        },
        //Rentada, disponible, vendida
        availability:{
            type: String,
            required: true
        },
        extraConstruction: {
            type: [extraConstructionSchema],
            required: true
        },
        bedrooms: {
          type: Number,
          required: true
        },
        bathrooms: {
          type: Number,
            required: true
        },
        terrainArea: {
            type: Number,
            required: true
        },
        buildingArea: {
            type: Number,
            required: true
        },
        favorite: {
            type: Boolean,
            default: false,
            required: false
        }

    }
);

const House = mongoose.model('House',HouseSchema);

module.exports = {
    House
}
