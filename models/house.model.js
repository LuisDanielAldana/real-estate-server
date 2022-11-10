const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema(
    {
        NombreConstruccion: {
            type: String,
            required: true
        },
        TipoConstruccion: {
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

const areaSchema = new mongoose.Schema(
    {
        construccion: {
            type: Number,
            required: true
        },
        terreno: {
            type: Number,
            required: true
        }
    }
)

const HouseSchema = new mongoose.Schema(
    {
        nombre: {
          type: String,
          required: true
        },
        apellidos: {
          type: String,
          required: false
        },
        correo: {
            type: String,
            required: true
        },
        telefono: {
          type: Number,
          required: true
        },
        title: {
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
            required: false
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
        tipo:{
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
        estado:{
            type: String,
            required: true
        },
        construccion: {
            type: [childrenSchema],
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
        areaConstruccion: {
            type: areaSchema,
            required: true
        }

    }
);

const House = mongoose.model('House',HouseSchema);

module.exports = {
    House
}
