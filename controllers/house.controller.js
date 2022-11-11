const House = require('../models/house.model').House;

async function createHouse(req, res){
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address;
    const location = req.body.location;
    const tipo = req.body.tipo;
    const price = req.body.price;
    const buildingType = req.body.buildingType;
    const estado = req.body.estado;
    const construccion = req.body.construccion;
    const bedrooms = req.body.bedrooms;
    const bathrooms = req.body.bathrooms;
    const areaTerreno = req.body.areaTerreno;
    const areaConstruccion = req.body.areaConstruccion;

        try {
            const newHouse = await new House({
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                telefono: telefono,
                title: title,
                description: description,
                address: address,
                location: location,
                tipo: tipo,
                price: price,
                buildingType: buildingType,
                estado: estado,
                construccion: construccion,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                areaTerreno: areaTerreno,
                areaConstruccion: areaConstruccion


            }).save();
            res.status(200).json({
                message: "House Created",
                obj: newHouse
            })
        } catch (err){
            console.error(err);
            res.status(500).json({
                message: "Something happened when storing house",
                obj: null
            })
        }

}
async function findHouses(req, res){
    try {
        const house = await House.find({})
        res.status(200).json({
            message: "All houses in DB:",
            obj: house
        })
    } catch (err){
        console.error("Error Finding Houses")
        res.status(500).json({
            message: "Something happened when finding houses",
            obj: null
        })
    }
}

module.exports = {
    createHouse,
    findHouses,

}
