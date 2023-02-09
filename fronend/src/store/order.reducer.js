import { orderService } from '../services/order.service'

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'


const initialState = {
    orders: [],
    order: {},
}

export function orderReducer(state = initialState, action) {
    let orders
    let order
    switch (action.type) {
        case SET_ORDERS:
            // console.log('action.orders at reducer:',action.orders)
            return { ...state, orders: action.orders }
        case SET_ORDER:
            return { ...state, order: action.order }
        case REMOVE_ORDER:
            orders = state.orders.filter(order => order._id !== action.orderId)
            return { ...state, orders }
        case ADD_ORDER:
            orders = [...state.orders, action.order]
            return { ...state, orders }
        case UPDATE_ORDER:
            console.log('state.orders:', state.orders)
            orders = state.orders.map(order => order._id === action.order._id ? action.order : order)
            return { ...state, orders }
        default:
            return state;
    }
} 