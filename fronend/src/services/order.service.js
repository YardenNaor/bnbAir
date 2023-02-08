import { httpService } from './http.service'
import { SOCKET_EVENT_ORDER_FOR_HOST, socketService, SOCKET_EVENT_ORDER_FOR_USER } from './socket.service';
import { store } from '../store/store';


const STORAGE_KEY = 'order'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder
}

const ROUTE = 'order'


;(() => {
  socketService.on(SOCKET_EVENT_ORDER_FOR_USER, (order) => {
      // showSuccessMsg(`Your order was ${order.status}`)
      store.dispatch({type: 'UPDATE_ORDER', order})
  })
  socketService.on(SOCKET_EVENT_ORDER_FOR_HOST, (order) => {
      // showSuccessMsg(`Order received`)
      store.dispatch({type: 'ADD_ORDER', order})
  })
})()


function query(filterBy = {}) {
  // console.log('hi from query at orderservice:',)
  return httpService.get(ROUTE, { filterBy })
}

function getById(orderId) {
  console.log('orderId:', orderId)
  const order = httpService.get(`${ROUTE}/${orderId}`)
  // console.log('order at getById:', order)
  return order


}

function remove(orderId) {
  return httpService.delete(`${ROUTE}/${orderId}`)
}

function save(order) {
  // console.log('order at save :',order )
  if (order._id) {
    return httpService.put(`${ROUTE}/${order._id}`, order)
  } else {
    console.log('order at save- post:',order )
    return httpService.post(ROUTE, order)
  }
}


function getEmptyOrder() {
  return {
    // _id: '',
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





