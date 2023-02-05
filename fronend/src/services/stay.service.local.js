
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js';
const fs = require('fs');
var stays = require('../data/stay.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    getEmptyFilter,
    getParams,
    getNightsCount,
    getAllStays,
    getStaysByUserId
}
window.cs = stayService



async function getAllStays() {
    return storageService.query(STORAGE_KEY)
}

async function query(filterBy) {
    // console.log('filterBy at query:', filterBy)
    const staysFromStorage = await storageService.query(STORAGE_KEY)
    if (staysFromStorage.length) {
        var fillteredStays = staysFromStorage
        // console.log('from storge!!:', staysFromStorage)
    } else {
        const currStays = _arrangeStays(stays)
       
        storageService.save(STORAGE_KEY, currStays)
        fillteredStays = currStays
    }
    // console.log('stayes at query:', fillteredStays)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        fillteredStays = fillteredStays.filter(stay => {
            return regex.test(stay.loc.country) || regex.test(stay.loc.city)
        })
    }
    if (filterBy.type) {
        console.log('filterBy.type:', filterBy.type)
        fillteredStays = fillteredStays.filter(stay => {
            return stay.types.some(type => filterBy.type === type)
        })
    }
    if (filterBy.maxPrice) {
        fillteredStays = fillteredStays.filter(stay => stay.price <= filterBy.maxPrice)
    }
    if (filterBy.capacity) {
        fillteredStays = fillteredStays.filter(stay => stay.capacity >= filterBy.capacity.total)
    }

    if (filterBy.datesRange.timeStampStart) {
        const { timeStampStart, timeStampEnd } = filterBy.datesRange
        fillteredStays = fillteredStays.filter((stay => {
            if (!stay.orders) return stay
            return stay.orders?.every((order) => {
                return timeStampEnd <= order.startDate || timeStampStart >= order.endDate
            })
        }))
    }
    return fillteredStays
    // if (filterBy.region && filterBy.region !== 'flexible') {
    //     // console.log('filterBy.region at :', filterBy.region)
    //     // console.log('fillteredStays at by region:', fillteredStays)
    //     fillteredStays = fillteredStays.filter(stay => {
    //         // const stayRegion= stay.loc.region.toLowerCase()
    //         // console.log('stay.loc.region.toLowerCase():',stayRegion )
    //         return filterBy.region === stayRegion
    //         // || (stay.loc.country.toLowerCase()) === filterBy.region
    //     })
}



async function getStaysByUserId(userId) {
    let myStays
    const stays = await getAllStays()
    myStays = stays.filter(stay => stay.host._id === userId)

    return myStays

}

function getById(id) {
    // const staysFromStorage = await storageService.query(STORAGE_KEY)

    // return storageService.get(STORAGE_KEY, stayId)
    return storageService.get('stay', id)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    console.log(stay, "from stay service")
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}




function getEmptyStay() {
    return {
        name: '',
        type: '',
        imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        price: '',
        summery: '',
        capacity: 0,
        amenities: []
    }
}

function getEmptyFilter() {
    return {
        txt: '',
        type: '',
        region: '',
        maxPrice: Infinity,
        capacity: {
            adults: 1,
            kids: 0,
            infants: 0,
            pets: 0,
            total: 1
        },
        datesRange: {
            startDate: Date.now(),
            endDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
            totalNights: getNightsCount(Date.now(), Date.now() + (1000 * 60 * 60 * 24 * 7))
        }
    }
}

function getParams(filterBy) {
    const params = `?txt=${filterBy.txt}&capacityTotal=${filterBy.capacity.total}&capacityAdult=${filterBy.capacity.adults}&capacityKids=${filterBy.capacity.kids}&capacityInfants=${filterBy.capacity.infants}&capacityPets=${filterBy.capacity.pets}&startDate=${filterBy.datesRange.timeStampStart}&endDate=${filterBy.datesRange.timeStampEnd}&totalNights=${filterBy.datesRange.totalNights}&maxPrice=${filterBy.maxPrice}&region=${filterBy.region}&type=${filterBy.type}`
    return params
}


function getNightsCount(start, end) {
    const diff = end - start
    const nights = (diff / 1000 / 60 / 60 / 24) - 1
    // console.log('nights at getNIhgts count:', nights)
    return nights

}




function _arrangeStays(stays) {
    // for (let i = 0; i < 36; i++) {
    //     const stay = {
    //         _id: utilService.makeId(),
    //         loc: utilService.drawItems(locations),
    //         price: utilService.getRandomIntInclusive(500, 5000),
    stays.forEach(stay => {
        stay.types = []
        for (let i = 0; i < 3; i++) {
            const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
            stay.types.push(label)
        }
        stay.statReviews = {
            Cleanliness: utilService.getRandomIntInclusive(40, 50) / 10,
            Communication: utilService.getRandomIntInclusive(40, 50) / 10,
            CheckIn: utilService.getRandomIntInclusive(40, 50) / 10,
            Accuracy: utilService.getRandomIntInclusive(40, 50) / 10,
            Location: utilService.getRandomIntInclusive(40, 50) / 10,
            Value: utilService.getRandomIntInclusive(40, 50) / 10,
        }
        stay.host.pictureUrl = 'https://xsgames.co/randomusers/avatar.php?g=male'
        stay.reviews.forEach((review) => {
            review.by.imgUrl = `https://xsgames.co/randomusers/assets/avatars/male/${utilService.getRandomIntInclusive(1, 78)}.jpg`
        })
    })
    return stays
}



//         capacity: utilService.getRandomIntInclusive(1, 10),
//         amenities: labels[utilService.getRandomIntInclusive[0, 21],
//             utilService.getRandomIntInclusive[0, 21]],
//         imgUrls: [
//             utilService.drawItems(imgUrlsTresure),
//             utilService.drawItems(imgUrlsTresure)],
//         reviews: [{ by: { imgUrl: '' } }],
//         host: {},
//     }
//     stays.push(stay)
// }
//  utilService.shuffle(stays)

export const labels = [
    'Caves', 'Tropical', 'Countryside', 'Skiing',
    'Private rooms', 'OMG', 'Boats', 'Amazing views',
    'Beachfront', 'Top of the world', 'Luxe',
    'Off-the-grid', 'Play', 'Iconic cities', 'New',
    'Campers', 'Golfing', 'Earth homes', 'Ryokans',
    'Casas particulares', 'Minsus',
    'Adapted', "Camping"
]

// const locations = [
//     { city: 'Cleveland', country: 'Ohio', region: 'Unites states' },
//     { city: 'Berlin', country: 'Germany', region: 'Eourope' },
//     { city: 'Khon kean', country: 'Thailand', region: 'Asia' },
//     { city: 'Ndjamena', country: 'Chad', region: 'Africa' },
//     { city: 'Tripoli', country: 'Tunisia', region: 'Middel east' },
//     { city: 'Lusaka', country: 'Zambia', region: 'Africa' },
//     { city: 'Brisbane', country: 'Australia', region: 'Australia' },
//     { city: 'Vancouver', country: 'Canada', region: 'North america' },
//     { city: 'Nimed', country: 'Kongo', region: 'Africa' },
//     { city: 'Alop', country: 'Tunisia', region: 'Middel east' },
//     { city: 'Miklu', country: 'Zambia', region: 'Africa' },
//     { city: 'Sydney', country: 'Australia', region: 'Australia' },
//     { city: 'Vancouver', country: 'Canada', region: 'North america' },
//     { city: 'Clinton', country: 'North Carolina', region: 'Unites states' },
//     { city: 'Panama city', country: 'Panama', region: 'South america' },
//     { city: 'Bogota', country: 'Colombia', region: 'South america' },
//     { city: 'Telsen', country: 'Argentina', region: 'South america' },
//     { city: 'London', country: 'United kingdom', region: 'United kingdom' },
//     { city: 'Aalborg', country: 'Denmark', region: 'europe' },
//     { city: 'Odense', country: 'Denmark', region: 'europe' },
//     { city: 'Brussels', country: 'Belgium', region: 'europe' },
//     { city: 'Granada', country: 'Spain', region: 'europe' },
//     { city: 'Perpignan', country: 'France', region: 'europe' },
//     { city: 'Nimes', country: 'France', region: 'europe' },
//     { city: 'Malaga', country: 'Spain', region: 'europe' },
//     { city: 'Lyon', country: 'France', region: 'europe' },
//     { city: 'Limoges', country: 'France', region: 'europe' },
//     { city: 'Dacca', country: 'India', region: 'Asia' },
//     { city: 'London', country: 'United kingdom', region: 'europe' },
//     { city: 'Roskilde', country: 'Denmark', region: 'europe' },
//     { city: 'Brussels', country: 'Belgium', region: 'europe' },
//     { city: 'Budapest', country: 'Hungary', region: 'europe' },
//     { city: 'Barcelona', country: 'Spain', region: 'europe' },
//     { city: 'Jaen', country: 'Spain', region: 'europe' },
//     { city: 'Marseille', country: 'France', region: 'europe' },
//     { city: 'Paris', country: 'France', region: 'europe' },
//     { city: 'Jaen', country: 'Spain', region: 'europe' },
//     { city: 'Lyon', country: 'France', region: 'europe' },
//     { city: 'Paris', country: 'France', region: 'europe' },
//     { city: 'Dacca', country: 'India', region: 'Asia' }
// ]





// console.log('imgUrlsTresure.length:', imgUrlsTresure.length)


export const amenities = [
    "TV",
    "Cable TV",
    "Internet",
    "Wifi",
    "Air conditioning",
    "Wheelchair accessible",
    "Pool",
    "Kitchen",
    "Free parking on premises",
    "Doorman",
    "Gym",
    "Elevator",
    "Hot tub",
    "Heating",
    "Family/kid friendly",
    "Suitable for events",
    "Washer",
    "Dryer",
    "Smoke detector",
    "Staybon monoxide detector",
    "First aid kit",
    "Safety stayd",
    "Fire extinguisher",
    "Essentials",
    "Shampoo",
    "24-hour check-in",
    "Hangers",
    "Hair dryer",
    "Iron",
    "Laptop friendly workspace",
    "Self check-in",
    "Building staff",
    "Private entrance",
    "Stay-darkening shades",
    "Hot water",
    "Bed linens",
    "Extra pillows and blankets",
    "Ethernet connection",
    "Luggage dropoff allowed",
    "Long term stays allowed",
    "Ground floor access",
    "Wide hallway clearance",
    "Step-free access",
    "Wide doorway",
    "Flat path to front door",
    "Well-lit path to entrance",
    "Disabled parking spot",
    "Wide clearance to bed",
    "Wide entryway",
    "Waterfront",
    "Beachfront"
]

