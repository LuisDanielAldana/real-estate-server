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
        let query
        const tipo = req.body.tipo
        const buildingType = req.body.buildingType
        const minPrice = req.body.minPrice
        const maxPrice = req.body.maxPrice
        const houseLong = req.body.lng
        const houseLat = req.body.lat
        const _id = req.body._id

        if (tipo || buildingType || minPrice || maxPrice || (houseLong && houseLat) ) {
            query = {$and: []};

            if (tipo) {
                query["$and"].push({tipo: tipo});
            }

            if (buildingType) {
                query["$and"].push({buildingType: buildingType});
            }

            if (minPrice) {
                query["$and"].push({price: {"$gte": minPrice}});
            }

            if (maxPrice) {
                query["$and"].push({price: {"$lte": maxPrice}})
            }
            if (_id) {
                query["$and"].push({_id: _id});
            }

            if (houseLong && houseLat) {
                query["$and"].push(
                    {
                        location: {
                            $near: {
                                $maxDistance: 1000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: [houseLong, houseLat]
                                }
                            }
                        }
                    }
                )
            }

        } else {
            query = {};
        }
        const house = await House.find(
            query
        )
        res.status(200).json({
            message: "All houses in DB:",
            obj: house,
            mode: 'no-cors'
        })
    } catch (err){
        console.error("Error Finding Houses")
        res.status(500).json({
            message: "Something happened when finding houses",
            obj: null
        })
    }
}
async function addFavorite(req, res){
    try{
        await House.updateOne(
            {_id: _id},
            {favorite: true}
        )
    } catch (e){
        console.error("Error Adding favorites")
        res.status(500).json({
            message: "Something happened when adding favorite houses",
            obj: null
        })
    }
}
async function removeFavorite(req, res){
    try{
        await House.updateOne(
            {_id: _id},
            {favorite: false}
        )
    } catch (e){
        console.error("Error removing favorites")
        res.status(500).json({
            message: "Something happened when removing favorite houses",
            obj: null
        })
    }
}
async function findFavorites(req, res){
    try {
        const houses = await House.find(
            {
                favorite: true
            }
        )
        res.status(200).json({
            message: "Favorite Houses",
            obj: houses
        })
    } catch (e){
        console.error("Error Finding favorites")
        res.status(500).json({
            message: "Something happened when finding favorite houses",
            obj: null
        })
    }
}

async function editHouse(req, res){
    const title = req.body.title
    const description = req.body.description
    const addres = req.body.address
    const tipo = req.body.tipo
    const buildingType = req.body.buildingType
    const price = req.body.price
    const bedrooms = req.body.bedrooms
    const bathrooms = req.body.bathrooms
    try {
        const editedHouse = await House.updateOne(
            {_id:_id},
            {
                title:title,
                description:description,
                addres:addres,
                tipo:tipo,
                buildingType:buildingType,
                price:price,
                bedrooms:bedrooms,
                bathrooms:bathrooms
            }
        )
    } catch (e){
        console.log(e)
    }
}

module.exports = {
    createHouse,
    findHouses,
    addFavorite,
    removeFavorite,
    findFavorites,
    editHouse

}
