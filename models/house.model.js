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

const locationSchema = new Schema(
    {
        lat: Number,
        require: true
    },
    {
        lng: Number,
        require: true
    }
)

const areaSchema = new Schema(
    {
        construccion: Number,
        require: true
    },
    {
        terreno: Number,
        require: true
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
          required: true
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
            required: false
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
