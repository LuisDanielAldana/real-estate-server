const House = require('../models/house.model').House;

async function createHouse(req, res){
    const ownerName = req.body.ownerName;
    const ownerEmail = req.body.ownerEmail;
    const ownerPhone = req.body.ownerPhone;
    const houseHeader = req.body.houseHeader;
    const description = req.body.description;
    const address = req.body.address;
    const location = req.body.location;
    const dealType = req.body.dealType;
    const price = req.body.price;
    const buildingType = req.body.buildingType;
    const availability = req.body.availability;
    const extraConstruction = req.body.extraConstruction;
    const bedrooms = req.body.bedrooms;
    const bathrooms = req.body.bathrooms;
    const terrainArea = req.body.terrainArea;
    const buildingArea = req.body.buildingArea;
    const favorite = req.body.favorite

        try {
            const newHouse = await new House({
                ownerName: ownerName,
                ownerEmail: ownerEmail,
                ownerPhone: ownerPhone,
                houseHeader: houseHeader,
                description: description,
                address: address,
                location: location,
                dealType: dealType,
                price: price,
                buildingType: buildingType,
                availability: availability,
                extraConstruction: extraConstruction,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                terrainArea: terrainArea,
                buildingArea: buildingArea,
                favorite: favorite

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
        console.log(req.body)
        let query
        const dealType = req.body.dealType
        const buildingType = req.body.buildingType
        const minPrice = req.body.minPrice
        const maxPrice = req.body.maxPrice
        const houseLong = req.body.lng
        const houseLat = req.body.lat
        const _id = req.body._id


        if (dealType || buildingType || minPrice || maxPrice || (houseLong && houseLat) || _id ) {
            query = {$and: []};

            if (dealType) {
                query["$and"].push({dealType: dealType});
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
    const _id = req.body._id
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
    const _id = req.body._id
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
    const _id = req.body._id
    const ownerName = req.body.ownerName;
    const ownerEmail = req.body.ownerEmail;
    const ownerPhone = req.body.ownerPhone;
    const houseHeader = req.body.houseHeader;
    const description = req.body.description;
    const address = req.body.address;
    const location = req.body.location;
    const dealType = req.body.dealType;
    const price = req.body.price;
    const buildingType = req.body.buildingType;
    const availability = req.body.availability;
    const extraConstruction = req.body.extraConstruction;
    const bedrooms = req.body.bedrooms;
    const bathrooms = req.body.bathrooms;
    const terrainArea = req.body.terrainArea;
    const buildingArea = req.body.buildingArea;
    const favorite = req.body.favorite
    try {
        const editedHouse = await House.updateOne(
            {_id:_id},
            {
                ownerName: ownerName,
                ownerEmail: ownerEmail,
                ownerPhone: ownerPhone,
                houseHeader: houseHeader,
                description: description,
                address: address,
                location: location,
                dealType: dealType,
                price: price,
                buildingType: buildingType,
                availability: availability,
                extraConstruction: extraConstruction,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                terrainArea: terrainArea,
                buildingArea: buildingArea,
                favorite: favorite
            }
        )
        res.status(200).json({
            message: "Edited House",
            obj: editedHouse
        })
    } catch (e){
        console.log(e)
        res.status(500).json({
            message: "Something happened when editing houses",
            obj: null
        })
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
