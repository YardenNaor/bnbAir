// The host got a new order and changed the status to 'approved' or 'declined'
async function changeStatus(orderId, orderStatus) {
    try {
        const order = await getOrderById(orderId)
        order.status = orderStatus
        updateOrder(order)
        LoadMayOrders()// loading the updated orders at the compenent
    } catch (err) {
        UserMsg('Updating failed', err)
    }
}
// Sending a request to save the updted order and dispaching at the store
export function updateOrder(order) {
    try {
        const savedOrder = orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order })
        return savedOrder
    } catch (err) {
        console.log(err)
        throw err
    }
}
// At the buyer side:
async function getMyOrders() {
    try {
        // Getting all the updated orders of the buyer 
        const orders = await orderService.getOrdersByBuyerId(loggedinUser._id)
        setMyOrders(orders)// Using a useState function to re-render the component
    } catch (err) {
        userMsg('Sorry, there was a problem', err)
    }
}
// Rendering buyer orders in a table:
return (
    <table>
        <tbody>
            {data.map((order) => {
                const { status, guests, startDate, endDate, stay, totalPrice } = order
                return (
                    <tr className="trip-tr-body">
                        <td key={status} className={`trip-td-body ${status}`}>{status}</td>
                        <td key={guests} className="trip-td-body">{guests}</td>
                        <td key={startDate} className="trip-td-body">{startDate}</td>
                        <td key={endDate} className="trip-td-body">{endDate}</td>
                        <td key={startDate} className="trip-td-body">{startDate}</td>
                        <td key={stay} className="trip-td-body">{stay}</td>
                        <td key={totalPrice} className="trip-td-body">{totalPrice}</td>
                    </tr>
                )
            })}
        </tbody>
    </table >
)
