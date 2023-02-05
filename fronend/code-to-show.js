
//In the front the host gets a new order and changes the status to 'approved' or 'declined'

async function changeStatus(orderId, orderStatus) {
    try {
        const order = await getOrderById(orderId)
        order.status = orderStatus
        updateOrder(order)
        // loading the updated orders at the compenent
        LoadMyOrders()
    } catch (err) {
        UserMsg('Updating failed', err)
    }
}

// In the order.actions - Sending a request to save the updted order and dispaching at the store

async function updateOrder(order) {
    try {
        const savedOrder = orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order })
        return savedOrder
    } catch (err) {
        console.log(err)
        throw err
    }
}

// At the front buyer side:

async function getMyOrders() {
    try {
        // Getting all the updated orders of the buyer 
        const orders = await orderService.getOrdersByBuyerId(loggedinUser._id)
        setMyOrders(orders)// Using a useState function to re-render the component
    } catch (err) {
        userMsg('Sorry, there was a problem', err)
    }
}



