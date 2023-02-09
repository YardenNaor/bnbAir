import { orderService } from '../services/order.service'
import { store } from "./store.js"
import { SET_ORDERS, SET_ORDER, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER } from './order.reducer'

export function getActionRemoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}



export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        stay: order
    }
}


// export async function loadStay(orderId) {
//     try {
//         const order = await orderService.getById(orderId)
//         store.dispatch({ type: SET_ORDER    , order })
//         return order
//     } catch (err) {
//         console.log('Cannot load order: ', err)
//         throw err
//     }
// }

export async function loadOrder(orderId) {
    console.log('orderId at loadorder:',orderId)
    try {
        const order = await orderService.getById(orderId)
        store.dispatch({ type: SET_ORDER, order })
        return order
    } catch (err) {
        console.log('Cannot load stay: ', err)
        throw err
    }
}

export async function loadOrders() {
    try {
        const orders = await orderService.query()
        store.dispatch({ type: SET_ORDERS, orders })
        return orders
    } catch (err) {
        console.log('Cannot load orders: ', err)
        throw err
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getActionRemoveOrder(orderId))
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        console.log('Added Order', savedOrder)
        store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export function updateOrder(order) {
    try {
        const savedOrder = orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order })
        return savedOrder
    } catch (err) {
        console.log(err)
        throw err
    }
    // return orderService.save(order)
    //     .then(savedOrder => {
    //         store.dispatch(getActionUpdateOrder(savedOrder))

    //         return savedOrder
    //     })
    //     .catch(err => {
    //         console.log('Cannot save order', err)
    //         throw err
    //     })
}
