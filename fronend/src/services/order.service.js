import { httpService } from './http.service'

const STORAGE_KEY = 'order'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder
}

const ROUTE = 'order'

function query(filterBy = {}) {
  return httpService.get(ROUTE, { filterBy })
}

function getById(orderId) {
  console.log('orderId:', orderId)
  const order = httpService.get(`${ROUTE}/${orderId}`)
  // console.log('order at getById:', order)
  return order


}
// function getByBuyerId(userId) {
//   return httpService.get(`${ROUTE}/${userId}`)
// }
// function getByHostId(hostId) {
//   return httpService.get(`${ROUTE}/${hostId}`)
// }

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





