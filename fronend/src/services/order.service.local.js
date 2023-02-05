import { storageService } from './async-storage.service.js'
const fs = require('fs');
// var orders = require('../data/order.json')

// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    getOrdersByUserId,
    getOrdersByBuyerId
}
window.cs = orderService

async function query() {
    const ordersFromStorage = await storageService.query(STORAGE_KEY)

    if (!ordersFromStorage.length) {
        storageService.save(STORAGE_KEY, orders)
        return orders
    } else {
        return storageService.query(STORAGE_KEY)

    }
}

function getById(id) {

    return storageService.get('order', id)
}


async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {

        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function getOrdersByUserId(userId) {
    let myOrders
    const orders = await query()
    // myOrders = orders.filter(order => order.hostId === userId)
    myOrders = orders
    return myOrders
}

async function getOrdersByBuyerId(userId) {
    let myOrders
    const orders = await query()
    myOrders = orders.filter(order =>  order.buyer._id === userId)
    return myOrders

}


function getEmptyOrder() {
    return {
        _id: '',
        hostId: '',
        buyer: {},
        totalPrice: '',
        startDate: '',
        endDate: '',
        guests: '',
        stay: '',
        msgs: '',
        status: ''
    }
}

