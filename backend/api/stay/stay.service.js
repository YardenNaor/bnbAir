const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

// const fs = require('fs');
// const stays = require('../../data/stay.json')

// _arrangeStays(stays)

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        console.log('criteria at query of stays:', criteria)
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        // console.log('stays afrom mongo!',  stays.length)
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}



async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy = {}) {
    const criteria = {};

    console.log("function_buildCriteria -> filterBy", filterBy)
    if (filterBy.txt) {
        
        criteria.loc.country = { $regex: new RegExp(filterBy.txt, 'ig') }
        criteria.loc.city = { $regex: new RegExp(filterBy.txt, 'ig') }
    }
    // if (filterBy.region !== 'flexible' && filterBy.region) {
    //     criteria.region = filterBy.region
    // }
    if (filterBy.minPrice || filterBy.maxPrice) {
        criteria.price = {
            $gte: +filterBy.minPrice || 0,
            $lte: +filterBy.maxPrice || Infinity
        }
    }
    if (filterBy.capacity) {
        criteria.capacity = {
            $gte: +filterBy.capacity || 0,
        }
    }
    return criteria;
}





// function _arrangeStays(stays) {


//     const labels = [
//         'Caves', 'Tropical', 'Countryside', 'Skiing',
//         'Private rooms', 'OMG', 'Boats', 'Amazing views',
//         'Beachfront', 'Top of the world', 'Luxe',
//         'Off-the-grid', 'Play', 'Iconic cities', 'New',
//         'Campers', 'Golfing', 'Earth homes', 'Ryokans',
//         'Casas particulares', 'Minsus',
//         'Adapted'
//     ]
//     // for (let i = 0; i < 36; i++) {
//     //     const stay = {
//     //         _id: utilService.makeId(),
//     //         loc: utilService.drawItems(locations),
//     //         price: utilService.getRandomIntInclusive(500, 5000),

//     //     }
//     stays.forEach(stay => {
//         // stay.types = []
//         // for (let i = 0; i < 3; i++) {
//         //     const labelIdx = utilService.getRandomIntInclusive(0, labels.length - 1)
//         //     console.log(' labelIdx:', labelIdx)
//         //     const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
//         //     stay.types.push(label)
//         // }
//         // stay.statReviews = {
//         //     Cleanliness: utilService.getRandomIntInclusive(40, 50) / 10,
//         //     Communication: utilService.getRandomIntInclusive(40, 50) / 10,
//         //     CheckIn: utilService.getRandomIntInclusive(40, 50) / 10,
//         // Accuracy: utilService.getRandomIntInclusive(40, 50) / 10,
//         //     Location: utilService.getRandomIntInclusive(40, 50) / 10,
//         //     Value: utilService.getRandomIntInclusive(40, 50) / 10,

//         stay.host._id= "63dbac3c5705dc29556eae8d"
//         // stay.reviews.forEach((review) => {
//         //     review.by.imgUrl = `https://xsgames.co/randomusers/assets/avatars/male/${utilService.getRandomIntInclusive(1, 78)}.jpg`
//     })

//     _writeStaysToFile(stays)
//     return stays
// }



// 

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addStayMsg,
    removeStayMsg
}

